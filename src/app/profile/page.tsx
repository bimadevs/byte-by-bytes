import { Metadata } from "next";
import ProfileClient from "./profile-client";

export const metadata: Metadata = {
  title: "Profil Saya | Byte by Bytes",
  description: "Kelola informasi profil pengguna Byte by Bytes Anda",
};

export default function ProfilePage() {
  return <ProfileClient />;
} 