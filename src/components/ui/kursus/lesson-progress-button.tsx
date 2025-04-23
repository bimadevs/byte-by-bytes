"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { markLessonAsCompleted, getLessonProgress } from "@/lib/user-progress/actions";

interface LessonProgressButtonProps {
  courseId: string;
  lessonId: string;
}

export function LessonProgressButton({ courseId, lessonId }: LessonProgressButtonProps) {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mendapatkan status completed lesson saat pertama kali dimuat
  useEffect(() => {
    const checkProgress = async () => {
      if (authState.user?.id) {
        try {
          const { completed } = await getLessonProgress(
            authState.user.id,
            courseId,
            lessonId
          );
          setIsCompleted(completed);
        } catch (error) {
          console.error("Error checking lesson progress:", error);
        }
      }
    };

    checkProgress();
  }, [authState.user?.id, courseId, lessonId]);

  const handleMarkAsCompleted = async () => {
    if (!authState.user?.id) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login untuk mencatat progress",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { success, error } = await markLessonAsCompleted(
        authState.user.id,
        courseId,
        lessonId
      );

      if (success) {
        setIsCompleted(true);
        toast({
          title: "Pelajaran Selesai",
          description: "Progress Anda telah disimpan",
          variant: "default",
        });
      } else {
        throw new Error(error);
      }
    } catch (error: any) {
      toast({
        title: "Gagal Mencatat Progress",
        description: error.message || "Terjadi kesalahan saat menyimpan progress",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleMarkAsCompleted}
      disabled={isCompleted || isLoading}
      variant={isCompleted ? "outline" : "default"}
      className={`flex items-center ${isCompleted ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : ""}`}
    >
      {isCompleted ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          Pelajaran Selesai
        </>
      ) : isLoading ? (
        "Menyimpan..."
      ) : (
        "Tandai Selesai"
      )}
    </Button>
  );
} 