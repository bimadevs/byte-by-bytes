import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { getLessonById, getCourseById } from "@/lib/mdx";
import { Metadata } from "next";

type LessonPageProps = {
  params: {
    slug: string;
    lessonId: string;
  };
};

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

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLessonById(params.slug, params.lessonId);
  const course = await getCourseById(params.slug);

  if (!lesson || !course) {
    notFound();
  }

  // Mencari indeks dari pelajaran saat ini
  const currentIndex = course.lessons.findIndex((l) => l.id === params.lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation */}
        <div className="flex items-center mb-8 mt-12 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex items-center"
          >
            <Home size={16} className="mr-1" />
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href="/kursus"
            className="text-muted-foreground hover:text-primary"
          >
            Kursus
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href={`/kursus/${params.slug}`}
            className="text-muted-foreground hover:text-primary"
          >
            {course.title}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground truncate">{lesson.title}</span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-card rounded-lg border p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Daftar Pelajaran</h3>
                <Link
                  href={`/kursus/${params.slug}`}
                  className="text-xs text-primary hover:underline"
                >
                  Kembali ke Kursus
                </Link>
              </div>
              <ol className="space-y-2">
                {course.lessons.map((l, index) => (
                  <li key={l.id}>
                    <Link
                      href={`/kursus/${params.slug}/pelajaran/${l.id}`}
                      className={`flex items-center p-2 rounded-md text-sm ${
                        l.id === params.lessonId
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted transition-colors"
                      }`}
                    >
                      <span className="flex-shrink-0 flex items-center justify-center bg-muted text-muted-foreground w-6 h-6 rounded-full mr-2 text-xs">
                        {index + 1}
                      </span>
                      <span className="flex-1 truncate">{l.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Lesson content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-card rounded-lg border p-8">
              <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
              
              <div className="prose prose-blue dark:prose-invert max-w-none mb-8">
                {lesson.content.content}
              </div>

              {/* Navigation between lessons */}
              <div className="border-t pt-8 mt-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {prevLesson ? (
                    <Link
                      href={`/kursus/${params.slug}/pelajaran/${prevLesson.id}`}
                      className="inline-flex items-center text-sm font-medium hover:text-primary"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      <span className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Sebelumnya</span>
                        {prevLesson.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextLesson ? (
                    <Link
                      href={`/kursus/${params.slug}/pelajaran/${nextLesson.id}`}
                      className="inline-flex items-center text-sm font-medium hover:text-primary text-right"
                    >
                      <span className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Selanjutnya</span>
                        {nextLesson.title}
                      </span>
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  ) : (
                    <Link
                      href={`/kursus/${params.slug}`}
                      className="inline-flex items-center text-sm font-medium hover:text-primary"
                    >
                      <span className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Kembali ke</span>
                        Ringkasan Kursus
                      </span>
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 