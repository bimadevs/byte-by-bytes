"use client";

import Link from "next/link";
import { ArrowRight, GithubIcon, TwitterIcon, LinkedinIcon, MailIcon, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          {/* Company Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-2 lg:col-span-5"
          >
            <Link href="/" className="inline-block mb-6">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold"
              >
                Byte<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ByByte</span>
              </motion.span>
            </Link>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-600 dark:text-slate-400 max-w-md mb-6"
            >
              Platform belajar coding interaktif dengan materi terstruktur, latihan hands-on, dan dukungan komunitas untuk membantu Anda menguasai keterampilan pemrograman yang dibutuhkan di dunia nyata.
            </motion.p>
            {/* <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a 
                href="mailto:info@bytebybyte.com" 
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
                aria-label="Email"
              >
                <MailIcon size={18} />
              </a>
            </div> */}
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    Beranda
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/kursus" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    Kursus
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/tentang" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    Tentang Kami
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">
              Informasi
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/kebijakan-privasi" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    Kebijakan Privasi
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/syarat" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    Syarat & Ketentuan
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 3 }} transition={{ type: "spring" }}>
                <Link 
                  href="/faq" 
                  className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                >
                  <span className="relative">
                    FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          {/* <div className="lg:col-span-3">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              Berlangganan Newsletter
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Dapatkan update terbaru dan materi eksklusif
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Email anda" 
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
              />
              <button 
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-400 dark:focus:ring-offset-slate-900"
              >
                Daftar <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div> */}
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 text-center md:flex md:justify-between md:text-left"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} ByteByByte. Hak Cipta Dilindungi.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-0">
            Dibuat dengan <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, repeatDelay: 1.5 }}
              className="text-red-500"
            >❤️</motion.span> oleh BimaDev
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 