import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const featuredCourses = [
  {
    id: "javascript-dasar",
    title: "JavaScript Dasar",
    description: "Pelajari dasar-dasar JavaScript untuk memulai perjalanan Anda dalam pengembangan web.",
    image: "/images/courses/javascript.jpg",
    level: "Pemula",
    lessons: 12
  },
  {
    id: "react-fundamental",
    title: "React Fundamental",
    description: "Membangun aplikasi web interaktif dan dinamis dengan React framework.",
    image: "/images/courses/react.jpg",
    level: "Menengah",
    lessons: 15
  },
  {
    id: "typescript-modern",
    title: "TypeScript Modern",
    description: "Tingkatkan proyek JavaScript Anda dengan keamanan tipe statis dan fitur-fitur modern.",
    image: "/images/courses/typescript.jpg",
    level: "Menengah",
    lessons: 10
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/50 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url(/images/grid-pattern.svg)",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Kuasai Koding dengan Kursus Interaktif
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Platform belajar coding modern dengan materi terstruktur, proyek praktis, dan komunitas pendukung untuk semua level kemampuan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kursus"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Jelajahi Kursus
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/tentang"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-3 rounded-md font-medium transition-colors"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kursus Unggulan</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              Mulai perjalanan coding Anda dengan kursus-kursus pilihan yang dirancang untuk membantu Anda menguasai keterampilan yang paling dicari saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Link key={course.id} href={`/kursus/${course.id}`}>
                <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-video relative bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20">
                      <span className="text-white font-bold">{course.title}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {course.level}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {course.lessons} Pelajaran
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {course.description}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Lihat Kursus
                      <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/kursus"
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Lihat Semua Kursus
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih ByteByByte?</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              Platform kami dirancang untuk memberikan pengalaman belajar yang optimal dengan fitur-fitur yang membantu Anda menguasai coding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 border">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Materi Terstruktur</h3>
              <p className="text-muted-foreground">
                Materi pembelajaran terstruktur dan mudah dipahami dengan contoh praktis dan latihan untuk memperkuat pemahaman.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Proyek Praktis</h3>
              <p className="text-muted-foreground">
                Belajar dengan membangun proyek nyata yang akan memperkuat portofolio dan mempersiapkan Anda untuk dunia kerja.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Komunitas Pendukung</h3>
              <p className="text-muted-foreground">
                Bergabunglah dengan komunitas developer yang akan membantu Anda dalam proses belajar dan memecahkan masalah.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
