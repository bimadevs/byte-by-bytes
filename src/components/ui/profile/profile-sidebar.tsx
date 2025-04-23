"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import {
  User as UserIcon,
  Settings,
  BookOpen,
  History,
  Lock,
  Bell
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function ProfileSidebar() {
  const pathname = usePathname();
  const { authState } = useAuth();
  
  if (!authState.user) {
    return null;
  }
  
  const navItems: NavItem[] = [
    {
      label: "Profil Saya",
      href: "/profile",
      icon: <UserIcon className="h-5 w-5" />
    },
    {
      label: "Kursus Saya",
      href: "/kursus/progres",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      label: "Riwayat Belajar",
      href: "/riwayat",
      icon: <History className="h-5 w-5" />
    },
    {
      label: "Keamanan",
      href: "/profile/security",
      icon: <Lock className="h-5 w-5" />
    },
    {
      label: "Notifikasi",
      href: "/profile/notifications",
      icon: <Bell className="h-5 w-5" />
    },
    {
      label: "Pengaturan",
      href: "/pengaturan",
      icon: <Settings className="h-5 w-5" />
    },
  ];
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-4">
      <div className="flex items-center space-x-3 p-2 mb-6">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/50">
          {authState.user.avatar_url ? (
            <img 
              src={authState.user.avatar_url} 
              alt={authState.user.full_name || "User"} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-indigo-600 dark:text-indigo-300">
              <UserIcon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            {authState.user.full_name || "User"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {authState.user.email}
          </p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
              pathname === item.href
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className={`mr-3 ${
              pathname === item.href
                ? "text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400"
            }`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
} 