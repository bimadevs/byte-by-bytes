"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, MessageSquare, Users, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface WhatsAppModalProps {
  whatsappLink: string;
  isOpen?: boolean;
  onClose?: () => void;
  delay?: number; // delay in ms before showing the modal
  showOnce?: boolean; // if true, shows the modal only once per session
  className?: string;
}

export function WhatsAppModal({
  whatsappLink,
  isOpen: controlledIsOpen,
  onClose,
  delay = 5000,
  showOnce = true,
  className,
}: WhatsAppModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  
  // Handle controlled vs uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const showModal = isControlled ? controlledIsOpen : isOpen;
  
  // For auto-show with delay
  useEffect(() => {
    if (isControlled) return; // Don't auto-show in controlled mode
    
    // Check if we should show based on showOnce setting
    if (showOnce && hasShown) return;
    
    // Check if we've shown the modal before in this session
    if (showOnce && typeof window !== 'undefined') {
      const hasShownBefore = sessionStorage.getItem('whatsappModalShown') === 'true';
      if (hasShownBefore) return;
    }
    
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
      
      // Mark as shown in session storage
      if (showOnce && typeof window !== 'undefined') {
        sessionStorage.setItem('whatsappModalShown', 'true');
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isControlled, showOnce, hasShown, delay]);
  
  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setIsOpen(false);
    }
  };
  
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div 
        className={cn(
          "relative m-4 max-w-lg animate-fade-in-up overflow-hidden rounded-2xl bg-white p-0 shadow-xl dark:bg-slate-900",
          className
        )}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>
        
        {/* Green header */}
        <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 px-6 py-10 text-white">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-white opacity-10"></div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute -bottom-6 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-white opacity-10"></div>
          
          <div className="relative text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <MessageSquare size={32} />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Gabung Komunitas WhatsApp</h3>
            <p className="text-white/80">
              Dapatkan bantuan dan berdiskusi langsung dengan mentor dan teman-teman belajar!
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          <div className="mb-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <Check size={14} />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Mentor Berpengalaman</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tanya jawab langsung dengan mentor yang siap membantu
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <Check size={14} />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Materi Eksklusif</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Akses materi tambahan yang hanya tersedia di grup WhatsApp
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <Check size={14} />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Jaringan Pertemanan</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Perluas jaringan dengan sesama pembelajar coding
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex items-center justify-between rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Bergabunglah sekarang</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">100+ anggota aktif</p>
              </div>
            </div>
            <div className="animate-bounce">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleClose}
              className="w-1/3 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Nanti Saja
            </button>
            
            <Link 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex w-2/3 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition-all hover:bg-green-600"
            >
              <span>Gabung Grup WhatsApp</span>
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility untuk menambahkan animasi fade-in-up ke Tailwind
// Tambahkan ini ke globals.css atau file konfigurasi Tailwind
/*
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
*/ 