"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";

export function VerificationPage() {
  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <MailCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
        Cek Email Anda
      </h1>
      
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Kami telah mengirimkan email verifikasi ke alamat email yang Anda daftarkan. 
        Silakan periksa kotak masuk atau folder spam Anda.
      </p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          Link verifikasi akan kedaluwarsa dalam 24 jam. 
          Jika Anda tidak melakukan verifikasi, Anda perlu mendaftar kembali.
        </p>
      </div>
      
      <div className="space-y-4">
        <Link
          href="/auth/login"
          className="block w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Kembali ke Halaman Login
        </Link>
        
        <Link
          href="/"
          className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-center text-sm font-semibold text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
} 