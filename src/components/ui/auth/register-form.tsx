"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from "lucide-react";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { signUp } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi input
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Semua kolom harus diisi");
      return;
    }
    
    if (!validateEmail(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }
    
    if (!validatePassword(password)) {
      setErrorMessage("Password harus minimal 6 karakter");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        setErrorMessage(error.message || "Gagal mendaftar. Silakan coba lagi.");
      } else {
        // Redirect setelah register berhasil
        router.push("/auth/verification");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Mulai perjalanan belajar Anda di ByteByByte
        </p>
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-lg">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-3 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white sm:text-sm"
              placeholder="Nama Lengkap"
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MailIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-3 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white sm:text-sm"
              placeholder="email@contoh.com"
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-10 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white sm:text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Minimal 6 karakter
          </p>
        </div>
        
        <div>
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-10 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <label htmlFor="terms" className="ml-2 block text-xs text-slate-600 dark:text-slate-400">
            Saya setuju dengan{" "}
            <Link 
              href="/kebijakan-privasi" 
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Kebijakan Privasi
            </Link>{" "}
            dan{" "}
            <Link 
              href="/syarat" 
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Syarat & Ketentuan
            </Link>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Mendaftar..." : "Daftar Sekarang"}
        </button>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">Sudah punya akun? </span>
          <Link 
            href="/auth/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Masuk
          </Link>
        </div>
      </form>
    </div>
  );
} 