"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Code, Users, Star, ChevronRight, Sparkles, Clock } from "lucide-react";
import courses from "@/data/courses.json";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { WHATSAPP_GROUP_LINK, COMMUNITY_MEMBER_COUNT } from "@/lib/constant";
import { 
  AnimateOnScroll, 
  StaggerContainer, 
  StaggerItem, 
  ParallaxScroll,
  HoverEffectCard 
} from "@/components/animations/page-transitions";
import { motion } from "framer-motion";

// Helper untuk mendapatkan kursus unggulan
function getFeaturedCourses() {
  return courses.courses.filter(course => course.featured === true);
}

// Animasi untuk teks yang lebih ringan
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Animasi untuk container yang lebih ringan
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  // Mendapatkan daftar kursus unggulan
  const featuredCourses = getFeaturedCourses();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section dengan animasi yang dioptimasi */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background yang lebih ringan */}
        <div className="absolute inset-0 bg-[#0A0F1C]">
          {/* Hanya satu gradient animasi untuk mengurangi beban */}
          <div className="absolute left-0 top-0 h-[500px] w-[500px] translate-x-[-50%] translate-y-[-20%] rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-2xl"></div>
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-indigo-500/10 to-purple-500/10 blur-2xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Glass effect hero card dengan animasi ringan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg md:p-12"
          >
            {/* Mengurangi animasi glow */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/5 blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/5 blur-xl"></div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full md:w-3/5"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Platform Belajar Coding Gratis</span>
                </div>
                
                <motion.h1 
                  variants={textVariants}
                  className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                >
                  Belajar bersama{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Byte by Byte
                </span>
                </motion.h1>
                
                <motion.p 
                  variants={textVariants}
                  className="mb-8 text-base md:text-lg text-slate-300/90 max-w-xl"
                >
                  Platform pembelajaran interaktif dengan kurikulum terstruktur dan pendekatan praktis untuk menjadi developer yang handal tanpa biaya.
                </motion.p>
                
                <motion.div 
                  variants={textVariants}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <Link
                    href="/kursus"
                    className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    <span>Mulai Belajar</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
                  
              <Link
                href="/tentang"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3.5 font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:shadow-lg"
              >
                Tentang Kami
              </Link>
                </motion.div>
                
                <motion.div 
                  variants={textVariants}
                  className="flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i, index) => (
                      <div 
                        key={i} 
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800"
                      >
                        <div className={`absolute inset-0 ${
                          i === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                          i === 2 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                          i === 3 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          'bg-gradient-to-br from-purple-400 to-purple-600'
                        } opacity-60`}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                          {i === 1 ? 'JS' : i === 2 ? 'TS' : i === 3 ? 'PY' : 'PHP'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white">Unlock</span> Your Future with Byte by Byte
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-2/5 flex-shrink-0"
              >
                <div className="relative">
                  {/* Code window */}
                  <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80 shadow-xl">
                    <div className="flex items-center gap-1.5 border-b border-slate-700 bg-slate-800/50 px-4 py-3">
                      <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                      <div className="ml-2 text-xs font-medium text-slate-400">bytebybyte.jsx</div>
                    </div>
                    <div className="p-4 text-left font-mono text-sm">
                      <pre className="text-green-400/90">// Mulai perjalanan coding Anda</pre>
                      <pre className="mt-2">
                        <span className="text-purple-400">function </span>
                        <span className="text-blue-400">ByteByByte</span>
                        <span className="text-slate-300">() {'{'}</span>
                      </pre>
                      <pre className="ml-4">
                        <span className="text-purple-400">return </span>
                        <span className="text-slate-300">(</span>
                      </pre>
                      <pre className="ml-8">
                        <span className="text-indigo-400">{'<'}</span>
                        <span className="text-blue-400">Code</span>
                        <span className="text-indigo-400">{'>'}</span>
                      </pre>
                      <pre className="ml-12">
                        <span className="text-blue-300">
                          Masa Depan Cerah!
                        </span>
                      </pre>
                      <pre className="ml-8">
                        <span className="text-indigo-400">{'</'}</span>
                        <span className="text-blue-400">Code</span>
                        <span className="text-indigo-400">{'>'}</span>
                      </pre>
                      <pre className="ml-4"><span className="text-slate-300">);</span></pre>
                      <pre><span className="text-slate-300">{'}'}</span></pre>
            </div>
          </div>
          
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 opacity-30 blur-xl"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Tech stack pills */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5">
              {['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Next.js', 'Python'].map((tech) => (
                <div 
                  key={tech}
                  className="rounded-full border border-slate-700/60 bg-slate-800/40 px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {tech}
            </div>
              ))}
            </div>
            </div>
        </div>
      </section>

      {/* Featured Courses - Optimized */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0F1C]">
          <div className="absolute left-1/3 top-0 h-64 w-80 rounded-full bg-blue-500/5 blur-2xl"></div>
          <div className="absolute right-0 bottom-0 h-64 w-96 rounded-full bg-indigo-500/5 blur-2xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="relative inline-flex mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                <Star className="h-4 w-4" />
                <span>Kursus Unggulan</span>
              </div>
            </div>
            
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">Kurikulum Terstruktur <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Byte by Byte</span></h2>
            
            <p className="mx-auto max-w-3xl text-lg text-slate-300/90">
              Eksplorasi kursus-kursus populer untuk mengembangkan keterampilan coding Anda dengan pendekatan praktis dan mentor berpengalaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="h-full">
                <Link href={`/kursus/${course.id}`} className="group block h-full overflow-hidden">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-950/80 opacity-90"></div>
                    
                    <div className="relative z-10 h-full p-6 flex flex-col">
                      {/* Category and level badges */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 border border-blue-500/20">
                          <Code className="mr-1 h-3.5 w-3.5" />
                          {course.category}
                      </div>
                        <div className="inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-300">
                          {course.level}
                  </div>
                    </div>
                    
                      {/* Course title */}
                      <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {course.title}
                      </h3>
                    
                      <p className="mb-6 text-sm text-slate-300/80 flex-grow group-hover:text-slate-300 transition-colors">
                      {course.description}
                    </p>
                    
                      {/* Course stats */}
                      <div className="mt-auto">
                        <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpen className="mr-1.5 h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-300">{course.lessons} Lessons</span>
                          </div>
                          {/* <div className="flex items-center">
                            <Clock className="mr-1.5 h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-300">4 Minggu</span>
                          </div> */}
                        </div>
                      </div>
                      
                      {/* Progress overlay */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </Link>
                </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/kursus"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-white transition-all hover:border-blue-500/30 hover:bg-slate-800 hover:text-blue-400"
            >
              <span>Lihat Semua Kursus</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Optimized */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0F1C]">
          <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-blue-500/5 blur-2xl"></div>
          <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-2xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="relative inline-flex mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                <Sparkles className="h-4 w-4" />
                <span>Kenapa Byte by Byte</span>
              </div>
            </div>
            
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">Platform <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Modern</span> untuk Belajar Coding</h2>
            
            <p className="mx-auto max-w-3xl text-lg text-slate-300/90">
              Kami hadir untuk mempermudah perjalanan belajar Anda dalam dunia pemrograman dengan pendekatan yang terstruktur dan praktis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: "Kurikulum Terstruktur",
                description: "Materi disusun dengan rapi dari dasar hingga tingkat lanjut untuk membangun keahlian Anda secara bertahap."
              },
              {
                icon: BookOpen,
                title: "Pembelajaran Interaktif",
                description: "Belajar dengan kombinasi teori dan praktik yang seimbang melalui tutorial interaktif dan project nyata."
              },
              {
                icon: Users,
                title: "Komunitas Supportif",
                description: "Terhubung dengan sesama pelajar dan mentor untuk berbagi pengetahuan dan mendapatkan bantuan."
              }
            ].map((feature, index) => (
              <div key={index}>
                <div className="group h-full rounded-2xl border border-white/10 bg-slate-800/30 p-8 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/50 hover:shadow-lg">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3.5 text-blue-400 shadow-md">
                    <feature.icon className="h-8 w-8" />
            </div>
            
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300/80 group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
            </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Banner */}
      <CommunityBanner
        whatsappLink={WHATSAPP_GROUP_LINK}
        memberCount={COMMUNITY_MEMBER_COUNT}
      />
    </div>
  );
}
