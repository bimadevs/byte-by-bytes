import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { 
  AnimateOnScroll, 
  StaggerContainer, 
  StaggerItem 
} from "@/components/animations/page-transitions";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-64 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>
      
      <AnimateOnScroll animation="fade">
        <div className="relative w-28 h-28 mb-6 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
          <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">404</span>
        </div>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slideUp" delay={0.1}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Halaman Tidak Ditemukan</h2>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slideUp" delay={0.2}>
        <p className="text-muted-foreground mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>
      </AnimateOnScroll>
      
      <StaggerContainer staggerChildren={0.1} className="flex flex-col sm:flex-row gap-4">
        <StaggerItem>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <Home size={18} className="animate-pulse-slow" />
            Kembali ke Beranda
          </Link>
        </StaggerItem>
        
        <StaggerItem>
          <Link 
            href="/kursus" 
            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Jelajahi Kursus
          </Link>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
} 