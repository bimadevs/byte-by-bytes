"use client";

import Link from "next/link";
import { ArrowLeft, LayoutList, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { LessonProgressButton } from "@/components/ui/kursus/lesson-progress-button";
import { Course, Lesson, LessonData } from "@/lib/types";

interface LessonPageClientProps {
  course: Course;
  lesson: Lesson;
  params: {
    slug: string;
    lessonId: string;
  };
  prevLesson: LessonData | null;
  nextLesson: LessonData | null;
}

export default function LessonPageClient({ 
  course, 
  lesson, 
  params, 
  prevLesson, 
  nextLesson 
}: LessonPageClientProps) {
  // Hitung perkiraan waktu baca
  const wordCount = lesson.content.text?.split(/\s+/)?.length || 0;
  const readingTime = Math.ceil(wordCount / 200); // 200 kata per menit
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* ini biarin aja kosong, pusing gw buat atur jarak nya */}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
          <Link
              href={`/kursus/${params.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke kursus</span>
            </Link>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <Clock size={16} />
              <span>Waktu baca: {readingTime} menit</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              {lesson.title}
            </h1>
            
            {/* Lesson content - menggunakan children dari mdx yang sudah diproses */}
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl">
              {lesson.content.content}
            </div>

            {/* Tandai pelajaran selesai button */}
            <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-700">
              <LessonProgressButton courseId={params.slug} lessonId={params.lessonId} />
            </div>
          </div>
          
          {/* Lesson Navigation */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 mb-24">
            {prevLesson ? (
              <Link
                href={`/kursus/${params.slug}/pelajaran/${prevLesson.id}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/50 p-4 transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800/80"
              >
                <ChevronLeft size={20} />
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Pelajaran Sebelumnya</div>
                  <div className="font-medium text-slate-900 dark:text-white">{prevLesson.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextLesson ? (
              <Link
                href={`/kursus/${params.slug}/pelajaran/${nextLesson.id}`}
                className="flex items-center justify-end gap-3 rounded-lg border border-slate-200 bg-white/50 p-4 text-right transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800/80"
              >
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Pelajaran Selanjutnya</div>
                  <div className="font-medium text-slate-900 dark:text-white">{nextLesson.title}</div>
                </div>
                <ChevronRight size={20} />
              </Link>
            ) : (
              <Link
                href={`/kursus/${params.slug}`}
                className="flex items-center justify-end gap-3 rounded-lg border border-slate-200 bg-white/50 p-4 text-right transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800/80"
              >
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Kembali ke</div>
                  <div className="font-medium text-slate-900 dark:text-white">Ringkasan Kursus</div>
                </div>
                <LayoutList size={20} />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 