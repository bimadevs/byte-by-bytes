"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { verifyCertificateByNumber } from "@/lib/certificate/actions";

export function CertificateVerificationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    found: boolean;
    certificate?: {
      id: string;
      user_name: string;
      course_title: string;
      issue_date: string;
    };
  } | null>(null);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateNumber.trim()) {
      toast({
        title: "Masukkan Nomor Sertifikat",
        description: "Silakan masukkan nomor sertifikat yang ingin diverifikasi",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { certificate, error } = await verifyCertificateByNumber(certificateNumber);
      
      if (certificate) {
        setSearchResults({
          found: true,
          certificate: {
            id: certificate.id,
            user_name: certificate.user_name,
            course_title: certificate.course_title,
            issue_date: certificate.issue_date,
          },
        });
      } else {
        setSearchResults({ found: false });
        toast({
          title: "Sertifikat Tidak Ditemukan",
          description: error || "Nomor sertifikat yang dimasukkan tidak valid",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Gagal Memverifikasi",
        description: error.message || "Terjadi kesalahan saat memverifikasi sertifikat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const viewCertificate = () => {
    if (searchResults?.found && searchResults.certificate) {
      router.push(`/sertifikat/${searchResults.certificate.id}`);
    }
  };

  const resetForm = () => {
    setCertificateNumber("");
    setSearchResults(null);
  };

  return (
    <div>
      <form onSubmit={handleVerification} className="flex mb-6">
        <Input
          type="text"
          placeholder="Masukkan nomor sertifikat, contoh: CERT-ABC123"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="rounded-r-none"
        />
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="rounded-l-none"
        >
          {isLoading ? "Mencari..." : "Verifikasi"}
          {!isLoading && <Search className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      {searchResults && (
        <Card>
          <CardHeader className={`${searchResults.found ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
            <CardTitle className="flex items-center gap-2">
              {searchResults.found ? (
                <>
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-400">Sertifikat Valid</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-400">Sertifikat Tidak Ditemukan</span>
                </>
              )}
            </CardTitle>
            <CardDescription className={searchResults.found ? "text-green-700/70 dark:text-green-400/70" : "text-red-700/70 dark:text-red-400/70"}>
              {searchResults.found 
                ? "Selamat! Sertifikat ini asli dan terdaftar di sistem kami." 
                : "Nomor sertifikat yang Anda masukkan tidak terdaftar dalam sistem kami."}
            </CardDescription>
          </CardHeader>
          
          {searchResults.found && searchResults.certificate && (
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Penerima Sertifikat</div>
                  <div className="text-base font-medium">{searchResults.certificate.user_name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Kursus</div>
                  <div className="text-base font-medium">{searchResults.certificate.course_title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Tanggal Terbit</div>
                  <div className="text-base font-medium">{new Date(searchResults.certificate.issue_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}</div>
                </div>
              </div>
            </CardContent>
          )}
          
          <CardFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={resetForm}>
              Verifikasi Lainnya
            </Button>
            {searchResults.found && (
              <Button onClick={viewCertificate}>
                Lihat Sertifikat
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 