import { WhatsAppBannerExamples } from "@/components/ui/WhatsAppBannerExamples";

export const metadata = {
  title: "WhatsApp Banner Examples - Byte by Byte",
  description: "Contoh berbagai jenis banner WhatsApp untuk platform belajar coding Byte by Byte",
};

export default function WhatsAppBannersPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">WhatsApp Banner Examples</h1>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow">
          <WhatsAppBannerExamples />
        </div>
      </div>
    </main>
  );
} 