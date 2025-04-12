import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { getCourseById } from "@/lib/mdx";
import { Metadata } from "next";
import Image from "next/image";

type CoursePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await getCourseById(params.slug);

  if (!course) {
    return {
      title: "Kursus Tidak Ditemukan",
    };
  }

  return {
    title: `${course.title} | ByteByByte`,
    description: course.description,
    keywords: [course.category, "kursus coding", "belajar coding", course.title],
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/kursus"
          className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} className="mr-2" />
          Kembali ke Daftar Kursus
        </Link>

        {/* Course header */}
        <div className="bg-card rounded-lg overflow-hidden border mb-8">
          <div className="aspect-video relative bg-muted">
            <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20">
              <span className="text-white font-bold text-3xl">{course.title}</span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                {course.level}
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                {course.lessonsCount} Pelajaran
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-6">{course.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {course.lessons.length > 0 && (
                <Link
                  href={`/kursus/${params.slug}/pelajaran/${course.lessons[0].id}`}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen size={18} />
                  Mulai Belajar
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Course content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Tentang Kursus Ini</h2>
            <div className="prose prose-blue dark:prose-invert max-w-none mb-8">
              {course.content.content}
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg border p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Daftar Pelajaran</h3>
              {course.lessons.length > 0 ? (
                <ol className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/kursus/${params.slug}/pelajaran/${lesson.id}`}
                        className="flex items-center p-3 rounded-md hover:bg-muted transition-colors"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary w-8 h-8 rounded-full mr-3">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{lesson.title}</h4>
                          {lesson.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight size={16} className="ml-2 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Belum ada pelajaran yang tersedia untuk kursus ini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 