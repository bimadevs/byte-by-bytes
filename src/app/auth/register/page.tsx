import { Metadata } from "next";
import { RegisterForm } from "@/components/ui/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar | ByteByByte",
  description: "Daftar akun di ByteByByte untuk memulai perjalanan belajar coding",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
} 