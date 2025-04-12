import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Code, Users, Star } from "lucide-react";
import courses from "@/data/courses.json";

// Helper untuk mendapatkan kursus unggulan
function getFeaturedCourses() {
  return courses.courses.filter(course => course.featured === true);
}

export default function Home() {
  // Mendapatkan daftar kursus unggulan
  const featuredCourses = getFeaturedCourses();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 md:py-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-300 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-6xl lg:text-7xl">
              Kuasai Koding Dengan <span className="relative inline-block">Presisi<span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></span></span>
            </h1>
            <p className="mb-10 text-lg text-slate-300 md:text-xl">
              Platform belajar coding premium dengan materi terstruktur, proyek praktis, dan komunitas pendukung untuk mengembangkan karir Anda.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/kursus"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-medium text-white transition duration-300 ease-out sm:w-auto"
              >
                <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
                <span className="relative flex items-center gap-2">
                  Jelajahi Kursus <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/tentang"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 font-medium text-slate-200 backdrop-blur-sm transition-colors hover:bg-slate-800 hover:text-white sm:w-auto"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 border-t border-slate-800 pt-10 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">120+</div>
              <div className="mt-2 text-sm text-slate-400">Pelajaran</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="mt-2 text-sm text-slate-400">Kursus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1200+</div>
              <div className="mt-2 text-sm text-slate-400">Siswa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="mt-2 text-sm text-slate-400">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses - Premium Design */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              Kursus Unggulan
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Mulai Perjalanan Coding Anda
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Kursus-kursus terbaik kami dirancang untuk membantu Anda menguasai keterampilan yang paling dicari dalam industri teknologi saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link key={course.id} href={`/kursus/${course.id}`} className="group">
                <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800/80 dark:shadow-slate-800/20">
                  <div className="aspect-video overflow-hidden">
                    {course.image ? (
          <Image
                        src={course.image} 
                        alt={course.title} 
                        width={600} 
                        height={340} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-700">
                        <Code size={60} className="text-white opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                  
                  {/* Course details with premium styling */}
                  <div className="p-7">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {course.level}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                        {course.lessons} Pelajaran
                      </span>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {course.category}
                      </span>
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{course.title}</h3>
                    
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto flex items-center font-medium text-blue-600 transition-colors group-hover:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Lihat Kursus
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href="/kursus"
              className="group inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              Lihat Semua Kursus
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Elegant Design */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              Keunggulan Kami
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Mengapa Memilih ByteByByte?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Platform kami dirancang dengan fokus pada pengalaman belajar yang optimal, memberikan Anda semua yang Anda butuhkan untuk sukses.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800/30">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <BookOpen size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Materi Terstruktur</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Kurikulum yang dikembangkan oleh profesional industri dengan konten praktis dan strategi pembelajaran yang efektif.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800/30">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                <Code size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Proyek Praktis</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Perkuat pembelajaran Anda dengan membangun proyek dunia nyata yang akan meningkatkan portofolio dan keterampilan Anda.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800/30">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20">
                <Users size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Komunitas Pendukung</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Terhubung dengan mentor berpengalaman dan sesama pelajar dalam komunitas yang aktif mendukung perjalanan belajar Anda.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-1.5 shadow-2xl">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-8 dark:bg-slate-900 md:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Siap Memulai Perjalanan Coding Anda?
                </h2>
                <p className="mb-8 text-slate-600 dark:text-slate-400">
                  Bergabunglah dengan ribuan siswa yang telah mengembangkan keterampilan baru dan memajukan karir mereka.
                </p>
                <Link
                  href="/kursus"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-medium text-white transition duration-300 ease-out"
                >
                  <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
                  <span className="relative flex items-center gap-2">
                    Mulai Belajar Sekarang <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
