'use server';

import { createClient } from '@/lib/supabase/server';
import { CourseProgress, LessonProgress } from '@/lib/types';

/**
 * Mendapatkan jumlah total pelajaran untuk kursus dari file courses.json
 * @param courseId ID kursus
 * @returns Jumlah pelajaran atau 0 jika tidak ditemukan
 */
async function getTotalLessonsFromFile(courseId: string): Promise<number> {
  try {
    const { default: fs } = await import('fs/promises');
    const { default: path } = await import('path');
    
    const contentDir = path.join(process.cwd(), 'src', 'data', 'courses.json');
    const fileContents = await fs.readFile(contentDir, 'utf8');
    const coursesData = JSON.parse(fileContents);
    
    const course = coursesData.courses.find((c: any) => c.id === courseId);
    return course?.lessons || 0;
  } catch (error) {
    console.error('Error reading course data from file:', error);
    return 0;
  }
}

/**
 * Mendapatkan progress dari semua kursus untuk pengguna tertentu
 * 
 * @param userId ID pengguna
 * @returns Array berisi progress dari semua kursus
 */
export async function getUserProgressAllCourses(userId: string): Promise<CourseProgress[]> {
  const supabase = createClient();
  
  try {
    // Dapatkan semua progress pengguna dari database, grouped by course
    const { data, error } = await supabase
      .from('user_progress')
      .select('course_id, lesson_id, completed')
      .eq('user_id', userId);
      
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Kelompokkan berdasarkan course_id
    const progressByLessons = data.reduce((acc: Record<string, string[]>, curr: { course_id: string; lesson_id: string; completed: boolean }) => {
      if (!acc[curr.course_id]) {
        acc[curr.course_id] = [];
      }
      
      if (curr.completed) {
        acc[curr.course_id].push(curr.lesson_id);
      }
      
      return acc;
    }, {} as Record<string, string[]>);
    
    // Coba dapatkan data dari file system
    const { default: fs } = await import('fs/promises');
    const { default: path } = await import('path');
    
    let coursesData: any = null;
    try {
      const contentDir = path.join(process.cwd(), 'src', 'data', 'courses.json');
      const fileContents = await fs.readFile(contentDir, 'utf8');
      coursesData = JSON.parse(fileContents);
    } catch (fileError) {
      console.error('Error reading courses.json:', fileError);
    }
    
    // Susun data progress
    const progressPromises = Object.keys(progressByLessons).map(async (courseId) => {
      let totalLessons = 0;
      
      // Coba dapatkan dari file json dulu
      if (coursesData) {
        const course = coursesData.courses.find((c: any) => c.id === courseId);
        if (course) {
          totalLessons = course.lessons || 0;
        }
      }
      
      // Fallback ke database jika file JSON tidak ada atau kursus tidak ditemukan
      if (totalLessons === 0) {
        try {
          const { data: courseData } = await supabase
            .from('courses')
            .select('total_lessons')
            .eq('id', courseId)
            .single();
            
          totalLessons = courseData?.total_lessons || 0;
        } catch (dbError) {
          console.error('Error getting total lessons from database:', dbError);
        }
      }
      
      const completedLessons = progressByLessons[courseId].length;
      
      return {
        course_id: courseId,
        completed_lessons: completedLessons,
        total_lessons: totalLessons,
        last_completed_lesson_id: progressByLessons[courseId][progressByLessons[courseId].length - 1] || null,
        percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
      };
    });
    
    return Promise.all(progressPromises);
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
}

/**
 * Mendapatkan progress kursus tertentu untuk pengguna tertentu
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @returns Progress kursus
 */
export async function getUserProgressByCourse(
  userId: string,
  courseId: string
): Promise<CourseProgress | null> {
  const supabase = createClient();
  
  try {
    // Dapatkan progress pengguna untuk kursus tertentu
    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id, completed, updated_at')
      .eq('user_id', userId)
      .eq('course_id', courseId);
      
    if (error) throw error;
    
    if (!data) {
      return null;
    }
    
    // Hitung jumlah pelajaran yang selesai
    const completedLessons = data.filter((item: { completed: boolean }) => item.completed).length;
    
    // Coba mendapatkan total pelajaran dari file
    let totalLessons = await getTotalLessonsFromFile(courseId);
    
    // Fallback: coba dapatkan total pelajaran dari database jika tidak ada di file
    if (totalLessons === 0) {
      try {
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('total_lessons')
          .eq('id', courseId)
          .single();
          
        if (!courseError) {
          totalLessons = courseData?.total_lessons || 0;
        }
      } catch (dbError) {
        console.error('Error getting total lessons from database:', dbError);
        // Untuk courseError gagal, tetap gunakan nilai 0 yang sudah di-set
      }
    }
    
    // Dapatkan ID pelajaran terakhir yang diselesaikan
    const lastCompletedLesson = data
      .filter((item: { completed: boolean }) => item.completed)
      .sort((a: { updated_at: string }, b: { updated_at: string }) => 
        a.updated_at > b.updated_at ? -1 : 1
      )[0];
      
    return {
      course_id: courseId,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      last_completed_lesson_id: lastCompletedLesson?.lesson_id || null,
      percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    };
  } catch (error) {
    console.error('Error getting course progress:', error);
    throw error;
  }
}

/**
 * Menandai pelajaran sebagai selesai
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @param lessonId ID pelajaran
 * @returns Status operasi
 */
export async function markLessonAsCompleted(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<{ success: boolean; error?: string; }> {
  const supabase = createClient();
  
  try {
    // Cek apakah sudah ada entri untuk pelajaran ini
    const { data, error } = await supabase
      .from('user_progress')
      .select()
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('lesson_id', lessonId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    if (data) {
      // Update entri yang sudah ada
      const { error: updateError } = await supabase
        .from('user_progress')
        .update({ 
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId);
        
      if (updateError) throw updateError;
    } else {
      // Buat entri baru
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        });
        
      if (insertError) throw insertError;
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error marking lesson as completed:', error);
    return { 
      success: false,
      error: error.message || 'Terjadi kesalahan saat menandai pelajaran selesai'
    };
  }
}

/**
 * Mendapatkan status pelajaran apakah sudah diselesaikan
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @param lessonId ID pelajaran
 * @returns Status pelajaran
 */
export async function getLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<{ completed: boolean; }> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('lesson_id', lessonId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return { completed: data?.completed || false };
  } catch (error) {
    console.error('Error getting lesson progress:', error);
    return { completed: false };
  }
}

/**
 * Reset progress kursus untuk pengguna tertentu
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @returns Status operasi
 */
export async function resetCourseProgress(
  userId: string,
  courseId: string
): Promise<{ success: boolean; error?: string; }> {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Error resetting course progress:', error);
    return { 
      success: false,
      error: error.message || 'Terjadi kesalahan saat mereset progress kursus'
    };
  }
}

/**
 * Mengecek apakah pengguna memenuhi syarat untuk mendapatkan sertifikat
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @returns Status eligibilitas sertifikat
 */
export async function checkCertificateEligibility(
  userId: string,
  courseId: string
): Promise<{ eligible: boolean; error?: string; }> {
  const supabase = createClient();
  
  try {
    // Dapatkan semua progress pengguna untuk kursus ini
    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id, completed')
      .eq('user_id', userId as any)
      .eq('course_id', courseId as any);
      
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return { 
        eligible: false, 
        error: 'Tidak ada data progress untuk kursus ini' 
      };
    }
    
    // Hitung jumlah pelajaran yang sudah selesai
    const completedLessons = data.filter((item: any) => item.completed).length;
    
    // Ambil total pelajaran dari file courses.json
    let totalLessons = 0;
    try {
      const { default: fs } = await import('fs/promises');
      const { default: path } = await import('path');
      
      const contentDir = path.join(process.cwd(), 'src', 'data', 'courses.json');
      const fileContents = await fs.readFile(contentDir, 'utf8');
      const coursesData = JSON.parse(fileContents);
      
      const course = coursesData.courses.find((c: any) => c.id === courseId);
      if (course) {
        totalLessons = course.lessons || 0;
      }
    } catch (fileError) {
      console.error('Error reading course data from file:', fileError);
      // Kalau error, gunakan jumlah lesson yang tersedia di progress sebagai total
      // Asumsi: jika semua pelajaran telah diselesaikan, jumlah pelajaran sama dengan jumlah data progress
      const uniqueLessons = new Set(data.map((item: any) => item.lesson_id)).size;
      totalLessons = uniqueLessons;
    }
    
    if (totalLessons === 0) {
      return {
        eligible: false,
        error: 'Tidak dapat menentukan jumlah pelajaran untuk kursus ini'
      };
    }
    
    // Cek apakah pengguna telah menyelesaikan semua pelajaran
    if (completedLessons >= totalLessons) {
      return { eligible: true };
    } else {
      const percentage = Math.round((completedLessons / totalLessons) * 100);
      return { 
        eligible: false, 
        error: `Anda baru menyelesaikan ${percentage}% dari kursus. Selesaikan 100% untuk mendapatkan sertifikat` 
      };
    }
  } catch (error: any) {
    console.error('Error checking certificate eligibility:', error);
    return { 
      eligible: false, 
      error: error.message || 'Terjadi kesalahan saat memeriksa eligibilitas sertifikat' 
    };
  }
}

/**
 * Membuat sertifikat untuk pengguna yang telah menyelesaikan kursus
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @returns Status operasi dan ID sertifikat jika berhasil
 */
export async function generateCertificate(
  userId: string,
  courseId: string
): Promise<{ success: boolean; certificateId?: string; error?: string; }> {
  const supabase = createClient();
  
  try {
    // Cek eligibilitas dulu
    const { eligible, error: eligibilityError } = await checkCertificateEligibility(userId, courseId);
    
    if (!eligible) {
      return { 
        success: false, 
        error: eligibilityError || 'Tidak memenuhi syarat untuk mendapatkan sertifikat' 
      };
    }
    
    // Cek apakah sudah pernah membuat sertifikat untuk kursus ini
    const { data: existingCertificate, error: existingError } = await supabase
      .from('certificates')
      .select('id')
      .eq('user_id', userId as any)
      .eq('course_id', courseId as any)
      .single();
      
    if (existingError && existingError.code !== 'PGRST116') {
      throw existingError;
    }
    
    if (existingCertificate) {
      return { 
        success: true, 
        certificateId: existingCertificate.id,
        error: 'Anda sudah mengklaim sertifikat untuk kursus ini sebelumnya'
      };
    }
    
    // Dapatkan informasi kursus dari file system
    // Tidak mengakses tabel 'courses' langsung karena memang tidak ada
    let courseTitle = '';
    
    try {
      // Coba dapatkan data dari file courses.json
      const { default: fs } = await import('fs/promises');
      const { default: path } = await import('path');
      
      const contentDir = path.join(process.cwd(), 'src', 'data', 'courses.json');
      const fileContents = await fs.readFile(contentDir, 'utf8');
      const coursesData = JSON.parse(fileContents);
      
      // Mencari kursus berdasarkan ID
      const course = coursesData.courses.find((c: any) => c.id === courseId);
      if (course) {
        courseTitle = course.title;
      } else {
        // Fallback jika tidak ditemukan
        courseTitle = `Kursus ${courseId}`;
      }
    } catch (error) {
      console.error('Error reading course data:', error);
      // Fallback jika terjadi error
      courseTitle = `Kursus ${courseId}`;
    }
    
    // Dapatkan data pengguna
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId as any)
      .single();
      
    if (userError) throw userError;
    
    // Pastikan pengguna memiliki nama
    const userName = userData?.full_name || 'Pengguna';
    
    // Generate certificate number
    const certificateNumber = `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Buat sertifikat baru di database
    const { data: certificate, error: insertError } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        course_id: courseId,
        course_title: courseTitle,
        user_name: userName,
        certificate_number: certificateNumber,
        issue_date: new Date().toISOString(),
      } as any)
      .select('id')
      .single();
      
    if (insertError) throw insertError;
    
    return { 
      success: true, 
      certificateId: certificate?.id 
    };
  } catch (error: any) {
    console.error('Error generating certificate:', error);
    return { 
      success: false, 
      error: error.message || 'Terjadi kesalahan saat membuat sertifikat' 
    };
  }
}

/**
 * Mendapatkan sertifikat berdasarkan ID
 * 
 * @param certificateId ID sertifikat
 * @returns Data sertifikat
 */
export async function getCertificateById(
  certificateId: string
): Promise<{ certificate: any; error?: string; }> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();
      
    if (error) throw error;
    
    return { certificate: data };
  } catch (error: any) {
    console.error('Error getting certificate:', error);
    return { 
      certificate: null, 
      error: error.message || 'Terjadi kesalahan saat mengambil data sertifikat' 
    };
  }
}

/**
 * Mendapatkan sertifikat pengguna untuk kursus tertentu
 * 
 * @param userId ID pengguna
 * @param courseId ID kursus
 * @returns Data sertifikat
 */
export async function getUserCertificateForCourse(
  userId: string,
  courseId: string
): Promise<{ certificate: any; error?: string; }> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return { certificate: data || null };
  } catch (error: any) {
    console.error('Error getting user certificate:', error);
    return { 
      certificate: null, 
      error: error.message || 'Terjadi kesalahan saat mengambil data sertifikat' 
    };
  }
} 