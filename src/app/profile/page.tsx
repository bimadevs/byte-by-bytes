import { Metadata } from "next";
import { ProfileForm } from "@/components/ui/profile/profile-form";
import { ProfileSidebar } from "@/components/ui/profile/profile-sidebar";

export const metadata: Metadata = {
  title: "Profil Saya | Byte by Bytes",
  description: "Kelola informasi profil pengguna Byte by Bytes Anda",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Profil Saya
      </h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <ProfileSidebar />
        </div>
        <div className="md:col-span-3">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
} 