import { Metadata } from "next";
import { LoginForm } from "@/components/ui/auth/login-form";

export const metadata: Metadata = {
  title: "Login | ByteByByte",
  description: "Masuk ke akun ByteByByte untuk melanjutkan belajar",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 