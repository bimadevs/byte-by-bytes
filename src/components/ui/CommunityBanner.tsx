import React from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Users, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CommunityBannerProps {
  whatsappLink: string;
  variant?: "hero" | "sidebar" | "inline";
  className?: string;
  memberCount?: number;
  showBadge?: boolean;
}

export function CommunityBanner({
  whatsappLink,
  variant = "hero",
  className,
  memberCount = 400,
  showBadge = true,
}: CommunityBannerProps) {
  if (variant === "sidebar") {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl border border-green-200 bg-white p-4 shadow-sm dark:border-green-900/30 dark:bg-slate-800/90",
        className
      )}>
        {showBadge && (
          <div className="absolute -top-1 -right-1 z-10 flex items-center rounded-bl-lg rounded-tr-lg bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 text-xs font-bold text-white">
            Baru
          </div>
        )}
        
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
  <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
</svg>

          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Grup WhatsApp</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">{memberCount}+ member aktif</p>
          </div>
        </div>
        
        <div className="mb-4 space-y-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600 dark:text-slate-300">Tanya jawab langsung</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600 dark:text-slate-300">Materi tambahan eksklusif</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600 dark:text-slate-300">Diskusi topik terbaru</span>
          </div>
        </div>
        
        <Link 
          href={whatsappLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-between rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition-all hover:bg-green-600"
        >
          <span>Gabung Komunitas</span>
          <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "relative flex items-center gap-4 rounded-xl border border-l-4 border-l-green-500 border-green-200 bg-white p-4 shadow-sm dark:border-green-900/30 dark:border-l-green-500 dark:bg-slate-800/90",
        className
      )}>
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
          <Bell size={22} />
        </div>
        
        <div className="flex-1">
          <h4 className="mb-1 font-bold text-slate-900 dark:text-white">Komunitas Byte by Byte</h4>
          <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
            Diskusi real-time dan bantuan untuk pertanyaan coding Anda
          </p>
          
          <Link 
            href={whatsappLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            Gabung Sekarang
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="hidden sm:block">
          <div className="relative h-14 w-14">
            <div className="absolute left-0 top-0 h-14 w-14 animate-ping rounded-full bg-green-500 opacity-20"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-green-200 bg-white text-green-600 dark:border-green-800 dark:bg-slate-700">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
  <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
</svg>

            </div>
          </div>
          {showBadge && (
            <div className="absolute -bottom-2 -right-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
              {memberCount}+
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hero variant (default)
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      
      <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-8 text-white md:flex-row md:gap-10 md:px-10">
        <div>
          <div className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
            <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-white"></span>
            Komunitas Aktif
          </div>
          <h3 className="mb-2 text-2xl font-bold leading-tight md:text-3xl md:leading-tight">
            Bergabunglah dengan Grup WhatsApp Byte by Byte
          </h3>
          <p className="mb-4 text-white/80">
            Dapatkan bantuan, berbagi pengalaman, dan tetap terhubung dengan para mentor dan teman belajar.
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-green-600 shadow-lg shadow-black/10 transition-all hover:bg-green-50"
            >
              <span>Gabung via WhatsApp</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="relative -ml-2 first:ml-0" 
                    style={{ zIndex: 4 - i }}
                  >
                    <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-sm">
                <span className="font-bold">{memberCount}+</span> anggota aktif
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden w-1/3 max-w-[220px] flex-shrink-0 md:block">
          <div className="relative h-[180px] w-[180px]">
            <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white opacity-20"></div>
            <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
            <div className="absolute left-1/2 top-1/2 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
  <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
</svg>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 