import { Metadata } from "next";
import { CertificateVerificationForm } from "@/components/ui/sertifikat/certificate-verification-form";

export const metadata: Metadata = {
  title: "Verifikasi Sertifikat | Byte by Bytes",
  description: "Verifikasi keaslian sertifikat kursus dari Byte by Bytes dengan memasukkan nomor sertifikat",
};

export default function CertificateVerificationPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Verifikasi Sertifikat
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Pastikan keaslian sertifikat Byte by Bytes dengan memasukkan nomor sertifikat di bawah ini.
          </p>
        </div>
        
        <CertificateVerificationForm />
      </div>
    </div>
  );
} 