"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { LessonData } from "@/lib/types";
import { useAuth } from "@/components/auth-provider";
import { getLessonProgress } from "@/lib/user-progress/actions";

interface CourseLessonsListProps {
  courseId: string;
  lessons: LessonData[];
}

export function CourseLessonsList({ courseId, lessons }: CourseLessonsListProps) {
  const { authState } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      if (!authState.user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const completedStatus: Record<string, boolean> = {};
        
        // Fetch status untuk setiap pelajaran
        const progressPromises = lessons.map(async (lesson) => {
          const { completed } = await getLessonProgress(
            authState.user!.id,
            courseId,
            lesson.id
          );
          completedStatus[lesson.id] = completed;
        });
        
        await Promise.all(progressPromises);
        setCompletedLessons(completedStatus);
      } catch (error) {
        console.error("Error fetching lesson progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedLessons();
  }, [authState.user?.id, courseId, lessons]);

  return (
    <ol className="relative space-y-4 border-l border-slate-200 dark:border-slate-700">
      {lessons.map((lesson, index) => {
        const isCompleted = completedLessons[lesson.id];
        
        return (
          <li key={lesson.id} className="ml-6">
            <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 ${
              isCompleted 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
            }`}>
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </span>
            <Link
              href={`/kursus/${courseId}/pelajaran/${lesson.id}`}
              className="group block rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/30"
            >
              <div className="flex items-start">
                <h4 className={`mb-1 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
                  isCompleted 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-slate-900 dark:text-white"
                }`}>
                  {lesson.title}
                </h4>
                {isCompleted && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400 py-0.5 px-1.5 rounded-full bg-green-50 dark:bg-green-900/20">
                    Selesai
                  </span>
                )}
              </div>
              {lesson.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lesson.description}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
} 