"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CourseProgress } from "@/lib/types";
import { getUserProgressByCourse } from "@/lib/user-progress/actions";
import { useAuth } from "@/components/auth-provider";

interface CourseProgressCardProps {
  courseId: string;
  title: string;
  description: string;
  image: string;
  totalLessons: number;
}

export function CourseProgressCard({ 
  courseId, 
  title, 
  description, 
  image, 
  totalLessons 
}: CourseProgressCardProps) {
  const { authState } = useAuth();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (authState.user?.id) {
        setIsLoading(true);
        try {
          const data = await getUserProgressByCourse(authState.user.id, courseId);
          setProgress(data);
        } catch (error) {
          console.error("Error fetching course progress:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProgress();
  }, [authState.user?.id, courseId]);

  // Status kursus
  const getStatus = () => {
    if (!progress) return { text: "Belum Dimulai", icon: <Clock className="w-4 h-4 text-slate-500" /> };
    
    if (progress.percentage === 100) {
      return { text: "Selesai", icon: <CheckCircle className="w-4 h-4 text-green-500" /> };
    } else if (progress.percentage > 0) {
      return { text: "Sedang Berlangsung", icon: <Clock className="w-4 h-4 text-blue-500" /> };
    } else {
      return { text: "Belum Dimulai", icon: <AlertCircle className="w-4 h-4 text-slate-500" /> };
    }
  };

  const status = getStatus();

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div 
        className="h-32 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }} 
      />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="flex items-center mb-2 text-sm">
          <div className="flex items-center mr-4">
            {status.icon}
            <span className="ml-1">{status.text}</span>
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            {isLoading 
              ? "Memuat..." 
              : `${progress?.completed_lessons || 0}/${totalLessons} pelajaran`
            }
          </div>
        </div>
        
        <Progress 
          value={isLoading ? 0 : (progress?.percentage || 0)} 
          className="h-2" 
        />
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full" variant={progress?.percentage === 100 ? "outline" : "default"}>
          <Link href={`/kursus/${courseId}`}>
            {progress?.percentage === 100 
              ? "Lihat Kembali" 
              : progress?.percentage ? "Lanjutkan" : "Mulai Belajar"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 