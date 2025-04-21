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

// Animasi untuk teks
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  // Mendapatkan daftar kursus unggulan
  const featuredCourses = getFeaturedCourses();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Modern Hero Section dengan Glass Morphism */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Background gradients dengan animasi */}
        <div className="absolute inset-0 bg-[#0A0F1C]">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute left-0 top-0 h-[500px] w-[500px] translate-x-[-50%] translate-y-[-20%] rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
            className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-indigo-500/20 to-purple-500/20 blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
            className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-t from-blue-500/20 to-sky-500/20 blur-3xl"
          ></motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Glass effect hero card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm md:p-14"
          >
            <motion.div 
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-2xl"
            ></motion.div>
            <motion.div 
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
              className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl"
            ></motion.div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full md:w-3/5"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.div>
                  <span>Platform Belajar Coding Gratis</span>
                </motion.div>
                
                <motion.h1 
                  variants={textVariants}
                  className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                >
                  Belajar bersama{" "}
                  <motion.span 
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent inline-block"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    Byte by Byte
                  </motion.span>
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/kursus"
                      className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/25"
                    >
                      <span>Mulai Belajar</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </motion.div>
              </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/tentang"
                      className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3.5 font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white hover:shadow-lg"
              >
                Tentang Kami
              </Link>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  variants={textVariants}
                  className="flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i, index) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ y: -5, zIndex: 10 }}
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
                      </motion.div>
                    ))}
          </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-sm text-white/80"
                  >
                    <span className="font-semibold text-white">Unlock</span> Your Future with Byte by Byte
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-2/5 flex-shrink-0"
              >
                <div className="relative">
                  {/* Code window */}
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80 shadow-xl backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-1.5 border-b border-slate-700 bg-slate-800/50 px-4 py-3">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="h-3 w-3 rounded-full bg-red-500/80"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="h-3 w-3 rounded-full bg-yellow-500/80"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="h-3 w-3 rounded-full bg-green-500/80"
                      ></motion.div>
                      <div className="ml-2 text-xs font-medium text-slate-400">bytebybyte.jsx</div>
            </div>
                    <div className="p-4 text-left font-mono text-sm">
                      <pre className="text-green-400/90">// Mulai perjalanan coding Anda</pre>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <pre className="mt-2">
                          <span className="text-purple-400">function </span>
                          <span className="text-blue-400">ByteByByte</span>
                          <span className="text-slate-300">() {'{'}</span>
                        </pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 }}
                      >
                        <pre className="ml-4">
                          <span className="text-purple-400">return </span>
                          <span className="text-slate-300">(</span>
                        </pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.2 }}
                      >
                        <pre className="ml-8">
                          <span className="text-indigo-400">{'<'}</span>
                          <span className="text-blue-400">Code</span>
                          <span className="text-indigo-400">{'>'}</span>
                        </pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.4 }}
                      >
                        <pre className="ml-12">
                          <motion.span 
                            animate={{ color: ["#93c5fd", "#818cf8", "#93c5fd"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-blue-300 animate-pulse"
                          >
                            Masa Depan Cerah!
                          </motion.span>
                        </pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.6 }}
                      >
                        <pre className="ml-8">
                          <span className="text-indigo-400">{'</'}</span>
                          <span className="text-blue-400">Code</span>
                          <span className="text-indigo-400">{'>'}</span>
                        </pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.8 }}
                      >
                        <pre className="ml-4"><span className="text-slate-300">);</span></pre>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 2 }}
                      >
                        <pre><span className="text-slate-300">{'}'}</span></pre>
                      </motion.div>
            </div>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-xl"
                  ></motion.div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1
                    }}
                    className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-xl"
                  ></motion.div>
            </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Tech stack pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto mt-16 max-w-4xl"
          >
            <StaggerContainer staggerChildren={0.05} className="flex flex-wrap justify-center gap-3 md:gap-5">
              {['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Next.js', 'Python'].map((tech) => (
                <StaggerItem key={tech}>
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    className="rounded-full border border-slate-700/60 bg-slate-800/40 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:text-white"
                  >
                    {tech}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses - Premium Design */}
      <AnimateOnScroll animation="fade">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0F1C]">
            <div className="absolute left-1/3 top-0 h-64 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 h-64 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6">
            <div className="mb-16 text-center">
              <AnimateOnScroll animation="slideUp" className="relative inline-flex mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                  <Star className="h-4 w-4" />
                  <span>Kursus Unggulan</span>
                      </div>
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="fade">
                <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">Kurikulum Terstruktur <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Byte by Byte</span></h2>
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="slideUp" delay={0.1}>
                <p className="mx-auto max-w-3xl text-lg text-slate-300/90">
                  Eksplorasi kursus-kursus populer untuk mengembangkan keterampilan coding Anda dengan pendekatan praktis dan mentor berpengalaman.
                </p>
              </AnimateOnScroll>
                  </div>
                  
            <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course, index) => (
                <StaggerItem key={course.id}>
                  <HoverEffectCard>
                    <Link href={`/kursus/${course.id}`} className="group block h-full overflow-hidden">
                      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 transition-all duration-300 backdrop-blur-sm group-hover:border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-950/80 opacity-90"></div>
                        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>
                        
                        <div className="relative z-10 h-full p-6 flex flex-col">
                          {/* Category and level badges */}
                          <div className="mb-4 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 backdrop-blur-sm border border-blue-500/20 hover:scale-105 transition-transform">
                              <Code className="mr-1 h-3.5 w-3.5" />
                              {course.category}
                            </div>
                            <div className="inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm hover:scale-105 transition-transform">
                        {course.level}
                            </div>
                    </div>
                    
                          {/* Course title with motion */}
                          <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400 group-hover:translate-x-1 transition-transform">
                            {course.title}
                          </h3>
                    
                          <p className="mb-6 text-sm text-slate-300/80 flex-grow group-hover:text-slate-300 transition-colors">
                      {course.description}
                    </p>
                    
                          {/* Course stats */}
                          <div className="mt-auto">
                            <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center group-hover:-translate-y-0.5 transition-transform">
                                <BookOpen className="mr-1.5 h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-300">{course.lessons} Lessons</span>
                              </div>
                              <div className="flex items-center group-hover:-translate-y-0.5 transition-transform">
                                <Clock className="mr-1.5 h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-300">4 Minggu</span>
                    </div>
                            </div>
                          </div>
                          
                          {/* Progress overlay */}
                          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
                  </HoverEffectCard>
                </StaggerItem>
            ))}
            </StaggerContainer>

            <AnimateOnScroll animation="fade" delay={0.3} className="mt-12 text-center">
            <Link
              href="/kursus"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-slate-800 hover:text-blue-400"
            >
                <span>Lihat Semua Kursus</span>
                <ArrowRight className="h-4 w-4 animate-pulse-slow group-hover:translate-x-1 transition-transform" />
            </Link>
            </AnimateOnScroll>
        </div>
      </section>
      </AnimateOnScroll>

      {/* Features Section - Elegant Design */}
      <AnimateOnScroll animation="fade">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0F1C]">
            <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6">
            <div className="mb-16 text-center">
              <AnimateOnScroll animation="slideUp" className="relative inline-flex mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Kenapa Byte by Byte</span>
              </div>
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="fade">
                <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">Platform <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Modern</span> untuk Belajar Coding</h2>
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="slideUp" delay={0.1}>
                <p className="mx-auto max-w-3xl text-lg text-slate-300/90">
                  Kami hadir untuk mempermudah perjalanan belajar Anda dalam dunia pemrograman dengan pendekatan yang terstruktur dan praktis.
                </p>
              </AnimateOnScroll>
            </div>
            
            <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <StaggerItem key={index}>
                  <AnimateOnScroll animation="fade" threshold={0.2}>
                    <div className="group h-full rounded-2xl border border-white/10 bg-slate-800/30 p-8 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-500/5 backdrop-blur-sm">
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3.5 text-blue-400 shadow-lg shadow-blue-500/10 group-hover:scale-110 group-hover:-translate-y-1 transition-all">
                        <feature.icon className="h-8 w-8" />
            </div>
            
                      <h3 className="mb-3 text-xl font-bold text-white group-hover:translate-x-1 transition-transform">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-300/80 group-hover:text-slate-300 transition-colors">
                        {feature.description}
                      </p>
            </div>
                  </AnimateOnScroll>
                </StaggerItem>
              ))}
            </StaggerContainer>
        </div>
      </section>
      </AnimateOnScroll>
      
      {/* Community Banner */}
      <AnimateOnScroll animation="fade" threshold={0.2}>
        <CommunityBanner
          whatsappLink={WHATSAPP_GROUP_LINK}
          memberCount={COMMUNITY_MEMBER_COUNT}
        />
      </AnimateOnScroll>
    </div>
  );
}
