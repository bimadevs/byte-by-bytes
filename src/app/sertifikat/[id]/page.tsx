import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/certificate/actions";
import { CertificateDisplay } from "@/components/ui/sertifikat/certificate-display";

interface CertificatePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { certificate } = await getCertificateById(params.id);
  
  if (!certificate) {
    return {
      title: "Sertifikat Tidak Ditemukan"
    };
  }
  
  return {
    title: `Sertifikat Kursus ${certificate.course_title} | Byte by Bytes`,
    description: `Sertifikat penyelesaian kursus ${certificate.course_title} oleh ${certificate.user_name}`
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { certificate, error } = await getCertificateById(params.id);
  
  if (!certificate || error) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <CertificateDisplay certificate={certificate} />
    </div>
  );
} 