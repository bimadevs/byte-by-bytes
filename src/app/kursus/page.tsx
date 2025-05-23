"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, FilterX, ChevronDown } from "lucide-react";
import courses from "@/data/courses.json";
import Image from "next/image";
import { COMMUNITY_MEMBER_COUNT, WHATSAPP_GROUP_LINK } from "@/lib/constant";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { 
  AnimateOnScroll, 
  StaggerContainer, 
  StaggerItem, 
  HoverEffectCard 
} from "@/components/animations/page-transitions";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(courses.courses);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    level: ""
  });

  // Refs untuk komponen dropdown
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Extract unique categories and levels
  const categories = Array.from(new Set(courses.courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.courses.map(course => course.level)));

  // Handle klik diluar dropdown dengan useRef
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterPanelRef.current && 
        !filterPanelRef.current.contains(event.target as Node) &&
        toggleButtonRef.current && 
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }

    // Hanya pasang listener jika dropdown terbuka
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const applyFilters = () => {
    let filteredCourses = courses.courses;
    
    // Apply search query filter
    if (searchQuery.trim()) {
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filteredCourses = filteredCourses.filter(course => 
        course.category === filters.category
      );
    }
    
    // Apply level filter
    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => 
        course.level === filters.level
      );
    }
    
    setSearchResults(filteredCourses);
  };

  // Apply filters whenever search query or filters change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const resetFilters = () => {
    setFilters({ category: "", level: "" });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <AnimateOnScroll animation="fade">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-20 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
            <AnimateOnScroll animation="fade" delay={0.1}>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Jelajahi Semua Kursus
            </h1>
            <p className="mb-8 text-lg text-blue-100/80">
              Temukan kursus yang sesuai dengan kebutuhan Anda dan mulai perjalanan coding yang akan mengubah karir Anda hari ini.
            </p>
            
            <div className="mx-auto relative max-w-2xl pb-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex w-full items-center rounded-full border-2 border-white/30 bg-white/10 p-1 focus-within:border-white/50 shadow-xl shadow-blue-900/20 transition-all duration-300 hover:shadow-blue-900/30 hover:border-white/40">
                  <Search className="ml-3 h-5 w-5 text-white/70" />
                  <input 
                    type="text" 
                    placeholder="Cari kursus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-white/60 outline-none" 
                  />
                  <button 
                    type="button"
                    ref={toggleButtonRef}
                    onClick={() => setShowFilters(!showFilters)}
                    className={`mr-1 rounded-full p-2 text-white transition-all duration-300 ${showFilters ? 'bg-white/30 shadow-md' : 'bg-white/20'}`}
                    aria-label="Toggle filters"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  <button 
                    type="submit"
                    className="rounded-full bg-white px-4 py-2 font-medium text-indigo-600 hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  >
                    Cari
                  </button>
                </div>
                
                {/* Filter Panel */}
                <div 
                  ref={filterPanelRef}
                  className={`filter-panel absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl transition-all duration-300 overflow-visible z-50 border border-slate-200 dark:border-slate-700 ${
                    showFilters ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Kategori
                        </label>
                        <select
                          id="category"
                          value={filters.category}
                          onChange={(e) => setFilters({...filters, category: e.target.value})}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white z-50"
                        >
                          <option value="">Semua Kategori</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="level" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Level
                        </label>
                        <select
                          id="level"
                          value={filters.level}
                          onChange={(e) => setFilters({...filters, level: e.target.value})}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white z-50"
                        >
                          <option value="">Semua Level</option>
                          {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="flex items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
                      >
                        <FilterX className="mr-2 h-4 w-4" />
                        Reset Filter
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Spacer for dropdown */}
              <div className={`transition-all duration-300 ${showFilters ? 'h-52 md:h-44' : 'h-0'}`}></div>
            </div>
          </div>
            </AnimateOnScroll>
        </div>
      </section>
      </AnimateOnScroll>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fade">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Semua Kursus</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Menampilkan {searchResults.length} dari {courses.courses.length} kursus
                {(searchQuery || filters.category || filters.level) && (
                  <span>
                    {searchQuery && <span> untuk pencarian "{searchQuery}"</span>}
                    {filters.category && <span>, kategori "{filters.category}"</span>}
                    {filters.level && <span>, level "{filters.level}"</span>}
                  </span>
                )}
              </p>
            </div>
            {(searchQuery || filters.category || filters.level) && (
              <button
                onClick={resetFilters}
                  className="mt-4 sm:mt-0 inline-flex items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              >
                <FilterX className="mr-2 h-4 w-4" />
                Reset Filter
              </button>
            )}
          </div>
          </AnimateOnScroll>
          
          {searchResults.length > 0 ? (
            <>
              <AnimateOnScroll animation="fade" delay={0.1}>
                <div className="mb-8">
                  <CommunityBanner
                    whatsappLink={WHATSAPP_GROUP_LINK}
                    variant="inline"
                    memberCount={COMMUNITY_MEMBER_COUNT}
                  />
                </div>
              </AnimateOnScroll>
              
              <StaggerContainer staggerChildren={0.05} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((course) => (
                  <StaggerItem key={course.id}>
                    <HoverEffectCard>
                      <Link key={course.id} href={`/kursus/${course.id}`} className="group block h-full">
                  <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/90 dark:hover:shadow-slate-900/20">
                    <div className="relative aspect-video overflow-hidden">
                      {course.image ? (
                        <Image 
                          src={course.image} 
                          alt={course.title} 
                          width={600} 
                          height={340} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                                <BookOpen size={40} className="text-white opacity-40 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="inline-flex items-center rounded-full bg-blue-100/90 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/90 dark:text-blue-300">
                            {course.level}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-slate-100/90 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800/90 dark:text-slate-300">
                            {course.lessons} Pelajaran
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                            <div className="mb-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:scale-105 transition-transform duration-300">
                        {course.category}
                      </div>
                      
                            <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        {course.title}
                      </h3>
                      
                            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                        {course.description}
                      </p>
                      
                            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                              <span className="mr-2">Lihat Detail</span>
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 animate-pulse-slow" />
                      </div>
                    </div>
                  </div>
                </Link>
                    </HoverEffectCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          ) : (
            <AnimateOnScroll animation="fade">
              <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-800 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                  <FilterX size={32} className="text-slate-600 dark:text-slate-400" />
              </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Tidak Ada Hasil</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Tidak ditemukan kursus yang sesuai dengan filter Anda. Coba ubah kata kunci pencarian atau reset filter.
              </p>
              <button 
                onClick={resetFilters}
                  className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
              >
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset Filter
              </button>
            </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </div>
  );
} 