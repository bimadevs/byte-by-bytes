import { Metadata } from "next";
import { VerificationPage } from "@/components/ui/auth/verification-page";

export const metadata: Metadata = {
  title: "Verifikasi Email | ByteByByte",
  description: "Verifikasi email untuk mengaktifkan akun ByteByByte Anda",
};

export default function VerificationPageRoute() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-md">
          <VerificationPage />
        </div>
      </div>
    </div>
  );
} 