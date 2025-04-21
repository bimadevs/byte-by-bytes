import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Code, Users, Star, ChevronRight, Sparkles, Clock } from "lucide-react";
import courses from "@/data/courses.json";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { WHATSAPP_GROUP_LINK, COMMUNITY_MEMBER_COUNT } from "@/lib/constant";

// Helper untuk mendapatkan kursus unggulan
function getFeaturedCourses() {
  return courses.courses.filter(course => course.featured === true);
}

export default function Home() {
  // Mendapatkan daftar kursus unggulan
  const featuredCourses = getFeaturedCourses();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Modern Hero Section dengan Glass Morphism */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[#0A0F1C]">
          <div className="absolute left-0 top-0 h-[500px] w-[500px] translate-x-[-50%] translate-y-[-20%] rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-indigo-500/20 to-purple-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-t from-blue-500/20 to-sky-500/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Glass effect hero card */}
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm md:p-14">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl"></div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-3/5">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Platform Belajar Coding Gratis</span>
                </div>
                
                <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Bangun Karir Tech <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Byte by Byte</span>
                </h1>
                
                <p className="mb-8 text-base md:text-lg text-slate-300/90 max-w-xl">
                  Platform pembelajaran interaktif dengan kurikulum terstruktur dan pendekatan praktis untuk menjadi developer yang handal tanpa biaya.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/kursus"
                    className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    <span>Mulai Belajar</span>
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  
                  <Link
                    href="/tentang"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3.5 font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white hover:shadow-lg"
                  >
                    Tentang Kami
                  </Link>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800">
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
                </div>
              </div>
              
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="relative">
                  {/* Code window */}
                  <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80 shadow-xl backdrop-blur-sm">
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
                        <span className="text-blue-300 animate-pulse">Masa Depan Cerah!</span>
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
                  <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-xl"></div>
                  <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-40 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tech stack pills */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5">
              {['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Next.js', 'Python'].map((tech) => (
                <div 
                  key={tech} 
                  className="rounded-full border border-slate-700/60 bg-slate-800/40 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700/40 hover:text-white"
                >
                  {tech}
                </div>
              ))}
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

          <div className="mt-12 text-center">
            <Link
              href="/kursus"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-6 py-3 font-medium text-white transition-all hover:bg-slate-700 hover:border-slate-600"
            >
              Jelajahi Semua Kursus
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Elegant Design */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="mb-3 inline-block rounded-full bg-blue-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Keunggulan Kami
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Mengapa Memilih ByteByByte?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Platform kami dirancang dengan fokus pada pengalaman belajar yang optimal, memberikan Anda semua yang Anda butuhkan untuk sukses.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 hover:border-slate-700">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <BookOpen size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Materi Terstruktur</h3>
              <p className="text-slate-400">
                Kurikulum yang dikembangkan oleh profesional industri dengan konten praktis dan strategi pembelajaran yang efektif.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 hover:border-slate-700">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                <Code size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Proyek Praktis</h3>
              <p className="text-slate-400">
                Perkuat pembelajaran Anda dengan membangun proyek dunia nyata yang akan meningkatkan portofolio dan keterampilan Anda.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 hover:border-slate-700">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20">
                <Users size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Komunitas Pendukung</h3>
              <p className="text-slate-400">
                Terhubung dengan mentor berpengalaman dan sesama pelajar dalam komunitas yang aktif mendukung perjalanan belajar Anda.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Banner */}
      <section className="py-16 bg-slate-900/80">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <CommunityBanner 
              whatsappLink={WHATSAPP_GROUP_LINK}
              memberCount={COMMUNITY_MEMBER_COUNT}
              variant="hero"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
