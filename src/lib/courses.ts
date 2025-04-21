import coursesData from '@/data/courses.json';

// Definisikan tipe untuk data dari JSON
type CoursesDataType = {
  courses: {
    id: string;
    title: string;
    description: string;
    image: string;
    level: string;
    lessons: number;
    category: string;
    featured: boolean;
  }[];
};

// Cast data courses ke tipe yang benar
const typedCoursesData = coursesData as CoursesDataType;

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

// Interface untuk data kursus dari JSON
export interface CourseJSON {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  lessons: number;
  category: string;
  featured: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
}

/**
 * Helper function untuk mengkonversi data JSON course menjadi Course object
 */
function convertToCourse(courseData: CoursesDataType['courses'][0]): Course {
  return {
    ...courseData,
    content: '',
    lessonsData: []
  };
}

/**
 * Mendapatkan semua data kursus
 */
export function getAllCourses(): Course[] {
  return typedCoursesData.courses.map(convertToCourse);
}

/**
 * Mendapatkan kursus yang ditampilkan di halaman utama
 */
export function getFeaturedCourses(): Course[] {
  return typedCoursesData.courses
    .filter((course) => course.featured)
    .map(convertToCourse);
}

/**
 * Mendapatkan kursus berdasarkan ID
 */
export function getCourseById(courseId: string): Course | undefined {
  const course = typedCoursesData.courses.find((course) => course.id === courseId);
  if (!course) return undefined;
  
  return convertToCourse(course);
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
  return typedCoursesData.courses
    .filter((course) => course.category === category)
    .map(convertToCourse);
}

/**
 * Mendapatkan semua kategori kursus unik
 */
export function getAllCategories(): string[] {
  const categories = typedCoursesData.courses.map((course) => course.category);
  return Array.from(new Set(categories));
}

/**
 * Mendapatkan kursus berdasarkan level
 */
export function getCoursesByLevel(level: string): Course[] {
  return typedCoursesData.courses
    .filter((course) => course.level === level)
    .map(convertToCourse);
}

/**
 * Mendapatkan semua level kursus unik
 */
export function getAllLevels(): string[] {
  const levels = typedCoursesData.courses.map((course) => course.level);
  return Array.from(new Set(levels));
}

/**
 * Mencari kursus berdasarkan kata kunci
 */
export function searchCourses(keyword: string): Course[] {
  const lowercaseKeyword = keyword.toLowerCase();
  
  return typedCoursesData.courses
    .filter((course) => 
      course.title.toLowerCase().includes(lowercaseKeyword) || 
      course.description.toLowerCase().includes(lowercaseKeyword) ||
      course.category.toLowerCase().includes(lowercaseKeyword)
    )
    .map(convertToCourse);
} 