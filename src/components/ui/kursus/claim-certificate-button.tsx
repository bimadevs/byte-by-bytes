"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { checkCertificateEligibility, generateCertificate, getUserCertificateForCourse } from "@/lib/user-progress/actions";

interface ClaimCertificateButtonProps {
  courseId: string;
}

export function ClaimCertificateButton({ courseId }: ClaimCertificateButtonProps) {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [hasCertificate, setHasCertificate] = useState(false);

  // Cek apakah pengguna sudah memiliki sertifikat saat komponen dimuat
  useEffect(() => {
    const checkExistingCertificate = async () => {
      if (authState.user?.id) {
        try {
          const { certificate } = await getUserCertificateForCourse(
            authState.user.id,
            courseId
          );
          
          if (certificate) {
            setCertificateId(certificate.id);
            setHasCertificate(true);
          }
        } catch (error) {
          console.error("Error checking existing certificate:", error);
        }
      }
    };

    checkExistingCertificate();
  }, [authState.user?.id, courseId]);

  const handleClaimCertificate = async () => {
    if (!authState.user?.id) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login untuk mengklaim sertifikat",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Cek eligibilitas dulu
      const { eligible, error: eligibilityError } = await checkCertificateEligibility(
        authState.user.id,
        courseId
      );
      
      if (!eligible) {
        toast({
          title: "Tidak Dapat Mengklaim Sertifikat",
          description: eligibilityError || "Anda perlu menyelesaikan semua pelajaran terlebih dahulu",
          variant: "destructive",
        });
        return;
      }
      
      // Generate sertifikat
      const { success, certificateId: newCertificateId, error } = await generateCertificate(
        authState.user.id,
        courseId
      );
      
      if (success && newCertificateId) {
        setCertificateId(newCertificateId);
        setHasCertificate(true);
        toast({
          title: "Sertifikat Berhasil Dibuat",
          description: "Anda dapat melihat sertifikat Anda sekarang",
          variant: "default",
        });
      } else if (error) {
        // Jika sudah memiliki sertifikat
        if (error.includes("sebelumnya") && newCertificateId) {
          setCertificateId(newCertificateId);
          setHasCertificate(true);
          toast({
            title: "Sertifikat Sudah Ada",
            description: "Anda sudah mengklaim sertifikat untuk kursus ini",
            variant: "default",
          });
        } else {
          toast({
            title: "Gagal Membuat Sertifikat",
            description: error,
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Gagal Membuat Sertifikat",
        description: error.message || "Terjadi kesalahan saat membuat sertifikat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (hasCertificate && certificateId) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Check className="h-5 w-5" />
          <span>Sertifikat sudah diklaim</span>
        </div>
        <Button asChild variant="outline">
          <Link href={`/sertifikat/${certificateId}`}>Lihat Sertifikat</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleClaimCertificate}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Award className="h-5 w-5" />
      {isLoading ? "Memproses..." : "Klaim Sertifikat"}
    </Button>
  );
} 