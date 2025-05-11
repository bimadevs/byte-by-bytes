"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Certificate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ShareIcon, Printer } from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface CertificateDisplayProps {
  certificate: Certificate;
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    try {
      toast({
        title: "Sedang menyiapkan sertifikat",
        description: "Mohon tunggu sebentar..."
      });

      const element = certificateRef.current;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 297;
      const imgHeight = 210;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`sertifikat-${certificate.certificate_number}.pdf`);

      toast({
        title: "Sertifikat berhasil diunduh",
        description: "File PDF telah tersimpan di perangkat Anda",
        variant: "default"
      });

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Gagal mengunduh sertifikat",
        description: "Terjadi kesalahan saat menyiapkan sertifikat. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `Sertifikat Kursus ${certificate.course_title}`,
        text: `Lihat sertifikat penyelesaian kursus ${certificate.course_title} oleh ${certificate.user_name}`,
        url: window.location.href,
      }).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "URL sertifikat disalin",
        description: "URL sertifikat telah disalin ke clipboard",
        variant: "default"
      });
    }
  };

  const formattedDate = certificate.issue_date
    ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(certificate.issue_date))
    : '1 Mei 2025';

  return (
    <div className="flex flex-col items-center mt-16 sm:mt-20">
      <div className="w-full max-w-5xl print:w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 print:hidden relative z-10"
        >
          <div className="flex gap-2 mb-3 sm:mb-0">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm sm:text-base flex items-center gap-1 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Beranda
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/verifikasi-sertifikat" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm sm:text-base transition-colors duration-200">
              Verifikasi Sertifikat
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={handlePrintCertificate} variant="outline" size="sm" className="text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
              <Printer className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Cetak
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200" disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyiapkan...
                </>
              ) : (
                <>
                  <DownloadIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Download PDF
                </>
              )}
            </Button>
            <Button onClick={handleShareCertificate} variant="outline" size="sm" className="text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
              <ShareIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Bagikan
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="wrapper">
          <div ref={certificateRef} className="sertifikat-container">
            <div className="nama">{certificate.user_name}</div>
            <div className="kursus">{certificate.course_title}</div>
            <div className="tanggal">Pada {formattedDate}</div>
            <div className="nomor-sertifikat">No: {certificate.certificate_number}</div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; }
        .wrapper { width: 100%; max-width: 1086px; margin: 0 auto; padding: 20px; position: relative; z-index: 1; }
        .sertifikat-container {
  position: relative;
  width: 100%;
  padding-top: calc(768 / 1086 * 100%);
  font-family: 'Arial', sans-serif;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  background-image: 
  url('/images/Cert-bg.png');
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
  animation: border-gradient 8s ease infinite;
}
        .sertifikat-container > div {
          position: absolute;
          left: 0;
          width: 100%;
          text-align: center;
        }
        .nama { 
          top: 34%; 
          font-size: 4vw; 
          font-weight: bold; 
          color: #003366; 
        }
        .kursus { 
          top: 51%; 
          font-size: 3.5vw; 
          color: #333; 
        }
        .tanggal {
          bottom: 32%; 
          left: 22%; 
          width: auto; 
          font-size: 2.8vw; 
          text-align: left; 
          color: #003366; 
        }
        .nomor-sertifikat { 
          bottom: 5%; 
          left: 8%; 
          width: auto; 
          font-size: 2vw; 
          text-align: left; 
          color: #003366; }
        @media (min-width: 768px) {
          .nama { font-size: 56px; }
          .kursus { font-size: 40px; }
          .tanggal { font-size: 28px; }
          .nomor-sertifikat { font-size: 18px; }
        }
        @keyframes border-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media print {
          body * { visibility: hidden; }
          .wrapper, .sertifikat-container, .sertifikat-container * {
            visibility: visible;
          }
          .sertifikat-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: none;
            box-shadow: none;
          }
          .sertifikat-container::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
