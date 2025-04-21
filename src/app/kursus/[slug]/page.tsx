import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, User, Bookmark, CheckCircle, Calendar } from "lucide-react";
import { getCourseById } from "@/lib/mdx";
import { Metadata } from "next";
import Image from "next/image";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { WHATSAPP_GROUP_LINK, COMMUNITY_MEMBER_COUNT } from "@/lib/constant";

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

  const updatedDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 pt-20 pb-16 md:pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <Link
            href="/kursus"
            className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Daftar Kursus
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-sm">
                {course.level}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                {course.lessonsCount} Pelajaran
              </span>
              <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-100 backdrop-blur-sm">
                {course.category}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            
            <p className="mb-8 text-lg text-blue-100/80 md:text-xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-sm">Diperbarui {updatedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span className="text-sm">±{course.lessonsCount * 20} menit</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="text-sm">Semua level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="relative mx-auto max-w-6xl">
            <div className="-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-800/90">
              <div className="aspect-video relative bg-slate-900">
                {course.image ? (
                  <Image 
                    src={course.image} 
                    alt={course.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen size={60} className="text-white/20" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-12">
                  <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Tentang Kursus Ini</h2>
                  <div className="prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-xl prose-a:text-indigo-600 prose-img:rounded-xl dark:prose-invert dark:prose-headings:text-white dark:prose-a:text-indigo-400 max-w-none mb-8">
                    {course.content.content}
                  </div>
                </div>
                
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Yang Akan Anda Pelajari</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={20} className="mt-0.5 flex-shrink-0 text-green-500 dark:text-green-400" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {i === 0 && "Konsep dasar dan struktur kursus"}
                          {i === 1 && "Implementasi praktis dengan studi kasus"}
                          {i === 2 && "Latihan hands-on untuk memperkuat pemahaman"}
                          {i === 3 && "Teknik optimasi kode dan best practices"}
                          {i === 4 && "Integrasi dengan tools dan libraries populer"}
                          {i === 5 && "Proyek mini di akhir materi pembelajaran"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Daftar Pelajaran</h3>
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {course.lessons.length} Pelajaran
                    </span>
                  </div>
                  
                  {course.lessons.length > 0 ? (
                    <div className="mb-6">
                      <ol className="relative space-y-4 border-l border-slate-200 dark:border-slate-700">
                        {course.lessons.map((lesson, index) => (
                          <li key={lesson.id} className="ml-6">
                            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-800 ring-2 ring-white dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-slate-900">
                              {index + 1}
                            </span>
                            <Link
                              href={`/kursus/${params.slug}/pelajaran/${lesson.id}`}
                              className="group block rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/30"
                            >
                              <h4 className="mb-1 font-medium text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                {lesson.title}
                              </h4>
                              {lesson.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {lesson.description}
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : (
                    <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                      Belum ada pelajaran yang tersedia untuk kursus ini.
                    </p>
                  )}
                  
                  {course.lessons.length > 0 && (
                    <Link
                      href={`/kursus/${params.slug}/pelajaran/${course.lessons[0].id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                      <span>Mulai Belajar</span>
                      <ArrowRight size={18} />
                    </Link>
                  )}
                  <div className="mt-6">
                  <CommunityBanner
                    whatsappLink={WHATSAPP_GROUP_LINK}
                    variant="sidebar"
                    memberCount={COMMUNITY_MEMBER_COUNT}
                    showBadge={true}
                  />
                </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 