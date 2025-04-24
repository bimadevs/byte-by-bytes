"use client";

import { ProfileForm } from "@/components/ui/profile/profile-form";
import { useAuth } from "@/components/auth-provider";

export default function ProfileClient() {
  const { authState } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold">Profil</h1>
        <ProfileForm />
      </div>
    </div>
  );
} 