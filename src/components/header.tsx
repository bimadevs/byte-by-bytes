"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Home, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Reset mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold transition-colors duration-300 text-white">
                Byte<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative group-hover:after:opacity-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300 group-hover:after:scale-x-100">ByByte</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-8"
          >
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/"
                className={`transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  pathname === "/"
                    ? "text-indigo-400 after:scale-x-100"
                    : `${scrolled 
                        ? "text-slate-300 hover:text-indigo-400" 
                        : "text-white hover:text-indigo-400"
                      }`
                }`}
              >
                Beranda
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/kursus"
                className={`transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  pathname === "/kursus" || pathname.startsWith("/kursus/")
                    ? "text-indigo-400 after:scale-x-100"
                    : `${scrolled 
                        ? "text-slate-300 hover:text-indigo-400" 
                        : "text-white hover:text-indigo-400"
                      }`
                }`}
              >
                Kursus
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/tentang"
                className={`transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  pathname === "/tentang"
                    ? "text-indigo-400 after:scale-x-100"
                    : `${scrolled 
                        ? "text-slate-300 hover:text-indigo-400" 
                        : "text-white hover:text-indigo-400"
                      }`
                }`}
              >
                Tentang
              </Link>
            </motion.div>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center md:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "bg-slate-800 hover:bg-slate-700 hover:shadow-md"
                  : "bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-sm"
              }`}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 rotate-90 text-white" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300 text-white" />
              )}
            </motion.button>
          </motion.div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-x-0 top-[73px] z-50 p-4 md:hidden"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-slate-900/95 backdrop-blur-lg p-6 shadow-xl ring-1 ring-white/10 mx-2"
                >
                  <motion.nav className="space-y-5">
                    <motion.div 
                      whileHover={{ x: 3 }} 
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/"
                        className={`flex items-center space-x-2 text-base font-medium transition-all duration-300 p-2 rounded-lg ${
                          pathname === "/" 
                            ? "text-indigo-400 bg-indigo-900/20" 
                            : "text-slate-200 hover:text-indigo-400 hover:bg-slate-800/60"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Home className="w-5 h-5" />
                        <span>Beranda</span>
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 3 }} 
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/kursus"
                        className={`flex items-center space-x-2 text-base font-medium transition-all duration-300 p-2 rounded-lg ${
                          pathname === "/kursus" || pathname.startsWith("/kursus/")
                            ? "text-indigo-400 bg-indigo-900/20" 
                            : "text-slate-200 hover:text-indigo-400 hover:bg-slate-800/60"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>Kursus</span>
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 3 }} 
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/tentang"
                        className={`flex items-center space-x-2 text-base font-medium transition-all duration-300 p-2 rounded-lg ${
                          pathname === "/tentang"
                            ? "text-indigo-400 bg-indigo-900/20" 
                            : "text-slate-200 hover:text-indigo-400 hover:bg-slate-800/60"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Info className="w-5 h-5" />
                        <span>Tentang</span>
                      </Link>
                    </motion.div>
                  </motion.nav>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
} 