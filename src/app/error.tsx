"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0A0F1C] px-4">
      <div className="relative max-w-md">
        {/* Gradient Blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -inset-10 rounded-full bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-3xl"
        />
        
        <div className="relative z-10 overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/60 p-8 backdrop-blur-md shadow-lg">
          {/* Icon Error */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-full bg-red-500/10 p-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-white">Terjadi Kesalahan</h2>
            <p className="mb-6 text-slate-400">
              Mohon maaf, telah terjadi kesalahan saat memuat konten. Silakan coba lagi atau kembali ke beranda.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => reset()}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-blue-500/25"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Coba Lagi</span>
              </motion.button>
              
              <Link href="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-slate-700"
                >
                  <span>Kembali ke Beranda</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Error code */}
            {error.digest && (
              <p className="mt-8 text-xs text-slate-500">
                Kode Kesalahan: {error.digest}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 