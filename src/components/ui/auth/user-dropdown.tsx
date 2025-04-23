"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { 
  User as UserIcon, 
  LogOut, 
  Settings, 
  BookOpen, 
  ChevronDown,
  History
} from "lucide-react";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { authState, signOut } = useAuth();
  const router = useRouter();
  
  // Tutup dropdown ketika user mengklik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Fungsi untuk handle logout
  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };
  
  // Jika tidak ada user, tampilkan tombol login
  if (!authState.user) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        <UserIcon className="h-4 w-4" />
        Masuk
      </Link>
    );
  }
  
  // Jika ada user, tampilkan dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <div className="relative h-6 w-6 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/50">
          {authState.user.avatar_url ? (
            <img
              src={authState.user.avatar_url}
              alt={authState.user.full_name || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-indigo-600 dark:text-indigo-300">
              <UserIcon className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
        <span className="text-slate-900 dark:text-white">
          {authState.user.full_name?.split(" ")[0] || "User"}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {authState.user.full_name || "User"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {authState.user.email}
            </p>
          </div>
          
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Profil Saya
            </Link>
            <Link
              href="/kursus/progres"
              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Kursus Saya
            </Link>
            <Link
              href="/riwayat"
              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <History className="mr-2 h-4 w-4" />
              Riwayat Belajar
            </Link>
            <Link
              href="/pengaturan"
              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan
            </Link>
          </div>
          
          <div className="border-t border-slate-200 py-1 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 