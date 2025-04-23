// File ini berisi data kursus dummy yang dapat digunakan
// saat sistem file tidak tersedia (di lingkungan client)
import React from 'react';

export interface CourseData {
  id: string;
  title: string;
  description: string;
  image?: string;
  level: string;
  category: string;
  lessonsCount: number;
  lessons: number;
}

// Data kursus dummy
const COURSES: CourseData[] = [
  {
    id: "nextjs-dasar",
    title: "Next.js Dasar",
    description: "Belajar dasar-dasar Next.js untuk membangun aplikasi web modern",
    image: "/images/courses/nextjs-dasar.jpg",
    level: "Pemula",
    category: "Frontend",
    lessonsCount: 10,
    lessons: 10,
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    description: "Menguasai React Hooks untuk state management yang lebih baik",
    image: "/images/courses/react-hooks.jpg",
    level: "Menengah",
    category: "Frontend",
    lessonsCount: 8,
    lessons: 8,
  },
  {
    id: "typescript-untuk-pemula",
    title: "TypeScript untuk Pemula",
    description: "Belajar TypeScript dari dasar untuk membangun aplikasi yang lebih aman",
    image: "/images/courses/typescript.jpg",
    level: "Pemula",
    category: "Bahasa Pemrograman",
    lessonsCount: 12,
    lessons: 12,
  },
  {
    id: "supabase-auth",
    title: "Autentikasi dengan Supabase",
    description: "Implementasi sistem autentikasi lengkap dengan Supabase",
    image: "/images/courses/supabase-auth.jpg",
    level: "Menengah",
    category: "Backend",
    lessonsCount: 6,
    lessons: 6,
  },
];

export interface LessonData {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  order: number;
  siblings?: LessonData[];
  content: {
    content: string;
    text: string;
  };
}

// Data pelajaran dummy
const LESSONS: Record<string, LessonData[]> = {
  "nextjs-dasar": [
    {
      id: "pengenalan",
      title: "Pengenalan Next.js",
      description: "Mengenal Next.js dan keunggulannya",
      courseId: "nextjs-dasar",
      order: 1,
      content: {
        content: "<h2>Pengenalan Next.js</h2><p>Next.js adalah framework React yang memungkinkan Anda membuat aplikasi web full-stack.</p>",
        text: "Pengenalan Next.js. Next.js adalah framework React yang memungkinkan Anda membuat aplikasi web full-stack."
      }
    },
    {
      id: "instalasi",
      title: "Instalasi dan Setup",
      description: "Cara menginstal dan menyiapkan proyek Next.js",
      courseId: "nextjs-dasar",
      order: 2,
      content: {
        content: "<h2>Instalasi Next.js</h2><p>Untuk memulai proyek Next.js, jalankan perintah berikut:</p><pre><code>npx create-next-app@latest</code></pre>",
        text: "Instalasi Next.js. Untuk memulai proyek Next.js, jalankan perintah berikut: npx create-next-app@latest"
      }
    }
  ],
  "react-hooks": [
    {
      id: "useState",
      title: "useState Hook",
      description: "Mengelola state dalam functional component",
      courseId: "react-hooks",
      order: 1,
      content: {
        content: "<h2>useState Hook</h2><p>useState adalah hook dasar untuk mengelola state lokal dalam komponen React.</p>",
        text: "useState Hook. useState adalah hook dasar untuk mengelola state lokal dalam komponen React."
      }
    }
  ]
};

// Mendapatkan semua kursus
export function getDummyCoursesV2(): CourseData[] {
  return COURSES;
}

// Mendapatkan kursus berdasarkan ID
export function getCourseById(id: string): CourseData | undefined {
  return COURSES.find(course => course.id === id);
}

// Mendapatkan pelajaran berdasarkan ID kursus dan ID pelajaran
export function getLessonById(courseId: string, lessonId: string): LessonData | undefined {
  const courseLessons = LESSONS[courseId];
  if (!courseLessons) return undefined;
  
  const lesson = courseLessons.find(lesson => lesson.id === lessonId);
  if (!lesson) return undefined;
  
  // Tambahkan siblings untuk navigasi prev/next
  return {
    ...lesson,
    siblings: courseLessons
  };
} 