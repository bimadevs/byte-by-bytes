"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, FilterX, ChevronDown } from "lucide-react";
import courses from "@/data/courses.json";
import Image from "next/image";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(courses.courses);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    level: ""
  });

  // Extract unique categories and levels
  const categories = Array.from(new Set(courses.courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.courses.map(course => course.level)));

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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Jelajahi Semua Kursus
            </h1>
            <p className="mb-8 text-lg text-blue-100/80">
              Temukan kursus yang sesuai dengan kebutuhan Anda dan mulai perjalanan coding yang akan mengubah karir Anda hari ini.
            </p>
            
            <div className="mx-auto relative max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex w-full items-center rounded-full border-2 border-white/30 bg-white/10 p-1 backdrop-blur-sm focus-within:border-white/50 shadow-xl shadow-blue-900/20 transition-all duration-300">
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
                    onClick={() => setShowFilters(!showFilters)}
                    className="mr-1 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-all duration-300"
                    aria-label="Toggle filters"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  <button 
                    type="submit"
                    className="rounded-full bg-white px-4 py-2 font-medium text-indigo-600 hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Cari
                  </button>
                </div>
                
                {/* Filter Panel */}
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl transition-all duration-300 overflow-hidden ${
                  showFilters ? 'max-h-96 opacity-100 z-10' : 'max-h-0 opacity-0 -z-10'
                }`}>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Kategori
                        </label>
                        <select
                          id="category"
                          value={filters.category}
                          onChange={(e) => setFilters({...filters, category: e.target.value})}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        >
                          <option value="">Semua Level</option>
                          {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      >
                        <FilterX className="mr-1 h-4 w-4" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
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
                className="mt-4 sm:mt-0 inline-flex items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <FilterX className="mr-2 h-4 w-4" />
                Reset Filter
              </button>
            )}
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((course) => (
                <Link key={course.id} href={`/kursus/${course.id}`} className="group">
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
                          <BookOpen size={40} className="text-white opacity-40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="inline-flex items-center rounded-full bg-blue-100/90 px-2.5 py-0.5 text-xs font-medium text-blue-800 backdrop-blur-sm dark:bg-blue-900/90 dark:text-blue-300">
                            {course.level}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-slate-100/90 px-2.5 py-0.5 text-xs font-medium text-slate-800 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
                            {course.lessons} Pelajaran
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {course.category}
                      </div>
                      
                      <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {course.title}
                      </h3>
                      
                      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center text-indigo-600 dark:text-indigo-400 transition-all duration-300">
                        <span className="font-medium">Lihat Kursus</span>
                        <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50">
                <Search className="h-10 w-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-slate-900 dark:text-white">
                Tidak ada hasil
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {searchQuery && <span>Tidak ada kursus yang sesuai dengan pencarian "{searchQuery}"</span>}
                {filters.category && <span> dalam kategori "{filters.category}"</span>}
                {filters.level && <span> dengan level "{filters.level}"</span>}
                {!searchQuery && !filters.category && !filters.level && <span>Tidak ada kursus yang tersedia saat ini</span>}
              </p>
              <button 
                onClick={resetFilters}
                className="mt-6 rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-500/20 hover:shadow-indigo-600/30"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 