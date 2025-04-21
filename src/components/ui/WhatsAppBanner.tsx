import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface WhatsAppBannerProps {
  whatsappLink: string;
  variant?: "default" | "compact" | "floating";
  className?: string;
}

export function WhatsAppBanner({
  whatsappLink,
  variant = "default",
  className,
}: WhatsAppBannerProps) {
  if (variant === "compact") {
    return (
      <div className={cn(
        "rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 shadow-sm dark:border-green-900/30 dark:from-green-950/30 dark:to-emerald-950/30",
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
              <MessageSquare size={18} />
            </div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Gabung Komunitas Belajar Byte by Byte
            </p>
          </div>
          <Link 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-green-500 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-green-600"
          >
            Gabung <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className={cn(
        "fixed bottom-6 right-6 z-50 w-auto max-w-xs animate-fade-in rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-800",
        className
      )}>
        <div className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
          1
        </div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <Users size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Komunitas WhatsApp</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">400+ member aktif</p>
          </div>
        </div>
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
          Bergabunglah dengan komunitas belajar coding bersama mentor berpengalaman dan teman-teman yang bersemangat.
        </p>
        <Link 
          href={whatsappLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2.5 font-medium text-white transition-all hover:bg-green-600"
        >
          Gabung Sekarang
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-md dark:border-green-900/30 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30",
      className
    )}>
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/10"></div>
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/10"></div>
        
        <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 sm:mb-0 sm:mr-8">
            <MessageSquare size={28} />
          </div>
          
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              Bergabunglah dengan Komunitas WhatsApp Byte by Byte
            </h3>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Dapatkan bantuan langsung dari mentor, bertukar ide dengan sesama pelajar, dan akses ke materi eksklusif dalam komunitas yang aktif dan mendukung.
            </p>
            
            <Link 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-xl hover:shadow-green-500/30"
            >
              <span>Gabung WhatsApp Group</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 