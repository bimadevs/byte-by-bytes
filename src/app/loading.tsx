"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0A0F1C]">
      <div className="relative">
        {/* Gradient Blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -inset-10 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-3xl"
        />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo dan animasi putar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-center rounded-xl border border-slate-700/30 bg-slate-800/50 p-5 backdrop-blur-sm shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="relative flex h-20 w-20 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border-t-2 border-blue-500"></div>
              <div className="absolute inset-1 rounded-full border-r-2 border-indigo-500"></div>
              <div className="absolute inset-2 rounded-full border-b-2 border-blue-400"></div>
              <BookOpen className="h-10 w-10 text-blue-400" />
            </motion.div>
          </motion.div>
          
          {/* Teks "Loading..." */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-1 text-xl font-bold text-white">Memuat Konten</h3>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
                />
              ))}
            </div>
          </motion.div>
          
          {/* Pesan Loading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 max-w-sm text-center text-sm text-slate-400"
          >
            Menyiapkan konten pembelajaran terbaik untuk Anda...
          </motion.p>
        </div>
      </div>
    </div>
  );
} 