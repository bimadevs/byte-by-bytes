'use server';

import { createClient } from '@/lib/supabase/server';
import { CourseProgress, LessonProgress } from '@/lib/types';

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
    
    // Dapatkan data total lessons per course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('id, total_lessons');
      
    if (courseError) throw courseError;
    
    // Susun data progress
    const progress: CourseProgress[] = Object.keys(progressByLessons).map(courseId => {
      const course = courseData?.find((c: { id: string; total_lessons: number }) => c.id === courseId);
      const completedLessons = progressByLessons[courseId].length;
      const totalLessons = course?.total_lessons || 0;
      
      return {
        course_id: courseId,
        completed_lessons: completedLessons,
        total_lessons: totalLessons,
        last_completed_lesson_id: progressByLessons[courseId][progressByLessons[courseId].length - 1] || null,
        percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
      };
    });
    
    return progress;
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
    
    // Dapatkan total pelajaran untuk kursus ini
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('total_lessons')
      .eq('id', courseId)
      .single();
      
    if (courseError && courseError.code !== 'PGRST116') throw courseError;
    
    const totalLessons = courseData?.total_lessons || 0;
    
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