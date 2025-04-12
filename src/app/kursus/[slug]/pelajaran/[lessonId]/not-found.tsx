import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LessonNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Pelajaran Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Maaf, pelajaran yang Anda cari tidak tersedia atau telah dihapus.
      </p>
      
      <Link 
        href="/kursus" 
        className="flex items-center text-primary hover:underline"
      >
        <ArrowLeft size={16} className="mr-2" />
        Kembali ke Daftar Kursus
      </Link>
    </div>
  );
} 