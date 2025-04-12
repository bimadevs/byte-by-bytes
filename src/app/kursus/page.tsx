import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Simulasi data kursus
const courses = [
  {
    id: "javascript-dasar",
    title: "JavaScript Dasar",
    description: "Pelajari dasar-dasar JavaScript untuk memulai perjalanan Anda dalam pengembangan web.",
    image: "/images/courses/javascript.jpg",
    level: "Pemula",
    lessons: 12,
    category: "Web Development"
  },
  {
    id: "react-fundamental",
    title: "React Fundamental",
    description: "Membangun aplikasi web interaktif dan dinamis dengan React framework.",
    image: "/images/courses/react.jpg",
    level: "Menengah",
    lessons: 15,
    category: "Frontend"
  },
  {
    id: "typescript-modern",
    title: "TypeScript Modern",
    description: "Tingkatkan proyek JavaScript Anda dengan keamanan tipe statis dan fitur-fitur modern.",
    image: "/images/courses/typescript.jpg",
    level: "Menengah",
    lessons: 10,
    category: "Web Development"
  },
  {
    id: "nodejs-backend",
    title: "Node.js untuk Backend",
    description: "Belajar membangun REST API dan aplikasi backend dengan Node.js dan Express.",
    image: "/images/courses/nodejs.jpg",
    level: "Menengah",
    lessons: 14,
    category: "Backend"
  },
  {
    id: "next-js-fullstack",
    title: "Next.js Fullstack",
    description: "Membangun aplikasi web fullstack dengan Next.js, API Routes, dan database.",
    image: "/images/courses/nextjs.jpg",
    level: "Lanjutan",
    lessons: 18,
    category: "Fullstack"
  },
  {
    id: "tailwind-css",
    title: "Tailwind CSS Masterclass",
    description: "Kuasai framework CSS utility-first untuk membangun UI modern dengan cepat.",
    image: "/images/courses/tailwind.jpg",
    level: "Pemula",
    lessons: 8,
    category: "UI/UX"
  }
];

// Mendapatkan kategori unik dari kursus
const categories = Array.from(
  new Set(courses.map(course => course.category))
);

export const metadata = {
  title: "Semua Kursus | ByteByByte",
  description: "Jelajahi semua kursus programming yang tersedia di platform ByteByByte"
};

export default function CoursesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Jelajahi Semua Kursus</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih dari berbagai kursus yang dirancang untuk setiap level kemampuan dan bidang spesialisasi yang Anda minati.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/4">
            <div className="bg-card rounded-lg border p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Filter</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Kategori</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`category-${category}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-muted-foreground">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Level</h3>
                <div className="space-y-2">
                  {["Pemula", "Menengah", "Lanjutan"].map((level) => (
                    <div key={level} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`level-${level}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-muted-foreground">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
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
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        <div className="flex items-center text-primary font-medium text-sm">
                          Lihat Kursus
                          <ArrowRight size={14} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 