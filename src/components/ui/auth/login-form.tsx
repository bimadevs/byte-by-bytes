"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Github, Mail } from "lucide-react";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState<{
    google: boolean;
    github: boolean;
  }>({
    google: false,
    github: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(prev => ({ ...prev, google: true }));
      setErrorMessage("");
      
      const { error } = await signInWithGoogle();
      
      if (error) {
        setErrorMessage(error.message || "Gagal masuk dengan Google. Silakan coba lagi.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsSubmitting(prev => ({ ...prev, google: false }));
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsSubmitting(prev => ({ ...prev, github: true }));
      setErrorMessage("");
      
      const { error } = await signInWithGithub();
      
      if (error) {
        setErrorMessage(error.message || "Gagal masuk dengan GitHub. Silakan coba lagi.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsSubmitting(prev => ({ ...prev, github: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Selamat Datang
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Masuk untuk melanjutkan perjalanan belajar Anda
        </p>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-lg">
          {errorMessage}
        </div>
      )}
      
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting.google}
          className={`flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors ${
            isSubmitting.google ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Mail className="h-5 w-5 text-red-500" />
          {isSubmitting.google ? "Menghubungkan..." : "Masuk dengan Google"}
        </button>
        
        <button
          type="button"
          onClick={handleGithubSignIn}
          disabled={isSubmitting.github}
          className={`flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors ${
            isSubmitting.github ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Github className="h-5 w-5" />
          {isSubmitting.github ? "Menghubungkan..." : "Masuk dengan GitHub"}
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Dengan masuk, Anda setuju dengan <Link href="/ketentuan" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Ketentuan Layanan</Link> dan <Link href="/privasi" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Kebijakan Privasi</Link> kami.
        </p>
      </div>
    </div>
  );
} 