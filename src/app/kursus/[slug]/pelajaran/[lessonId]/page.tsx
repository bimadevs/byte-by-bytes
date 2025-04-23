import { Metadata } from "next";
import { getCourseById, getLessonById } from "@/lib/mdx";
import { notFound } from "next/navigation";
import LessonPageClient from "./lesson-page-client";

export interface LessonPageProps {
  params: {
    slug: string;
    lessonId: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = await getLessonById(params.slug, params.lessonId);

  if (!lesson) {
    return {
      title: "Pelajaran Tidak Ditemukan",
    };
  }

  return {
    title: `${lesson.title} | ByteByByte`,
    description: lesson.description || `Pelajaran dari kursus ${params.slug}`,
    keywords: ["tutorial coding", "belajar coding", params.slug, lesson.title],
  };
}

export default async function LessonPageServer({ params }: LessonPageProps) {
  const course = await getCourseById(params.slug);
  const lesson = await getLessonById(params.slug, params.lessonId);

  if (!course || !lesson) {
    notFound();
  }

  // Mencari indeks dari pelajaran saat ini
  const currentIndex = course.lessons.findIndex((l) => l.id === params.lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  return (
    <LessonPageClient 
      course={course}
      lesson={lesson}
      params={params}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
} 