import coursesData from '@/data/courses.json';

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  lessons: number;
  category: string;
  featured: boolean;
  content: string;
  lessonsData: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
}

/**
 * Mendapatkan semua data kursus
 */
export function getAllCourses(): Course[] {
  return coursesData.courses;
}

/**
 * Mendapatkan kursus yang ditampilkan di halaman utama
 */
export function getFeaturedCourses(): Course[] {
  return coursesData.courses.filter((course) => course.featured);
}

/**
 * Mendapatkan kursus berdasarkan ID
 */
export function getCourseById(courseId: string): Course | undefined {
  return coursesData.courses.find((course) => course.id === courseId);
}

/**
 * Mendapatkan pelajaran berdasarkan ID kursus dan ID pelajaran
 */
export function getLessonById(courseId: string, lessonId: string): { lesson: Lesson; courseId: string } | undefined {
  const course = getCourseById(courseId);
  
  if (!course) return undefined;
  
  const lesson = course.lessonsData.find((lesson) => lesson.id === lessonId);
  
  if (!lesson) return undefined;
  
  return { lesson, courseId };
}

/**
 * Mendapatkan kursus berdasarkan kategori
 */
export function getCoursesByCategory(category: string): Course[] {
  return coursesData.courses.filter((course) => course.category === category);
}

/**
 * Mendapatkan semua kategori kursus unik
 */
export function getAllCategories(): string[] {
  const categories = coursesData.courses.map((course) => course.category);
  return Array.from(new Set(categories));
}

/**
 * Mendapatkan kursus berdasarkan level
 */
export function getCoursesByLevel(level: string): Course[] {
  return coursesData.courses.filter((course) => course.level === level);
}

/**
 * Mendapatkan semua level kursus unik
 */
export function getAllLevels(): string[] {
  const levels = coursesData.courses.map((course) => course.level);
  return Array.from(new Set(levels));
}

/**
 * Mencari kursus berdasarkan kata kunci
 */
export function searchCourses(keyword: string): Course[] {
  const lowercaseKeyword = keyword.toLowerCase();
  
  return coursesData.courses.filter((course) => 
    course.title.toLowerCase().includes(lowercaseKeyword) || 
    course.description.toLowerCase().includes(lowercaseKeyword) ||
    course.category.toLowerCase().includes(lowercaseKeyword)
  );
} 