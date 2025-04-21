import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppModal } from "@/components/ui/WhatsAppModal";
import { WHATSAPP_GROUP_LINK } from "@/lib/constant";
import { PageTransition } from "@/components/animations/page-transitions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ByteByByte - Platform E-Learning Coding",
  description: "Belajar coding melalui kursus-kursus interaktif dengan materi berkualitas tinggi",
  keywords: ["coding", "programming", "e-learning", "tutorial", "kursus online"],
  creator: "ByteByByte Team",
  authors: [{ name: "ByteByByte", url: "https://bytebybyte.id" }],
  publisher: "ByteByByte Education",
  robots: "index, follow",
  themeColor: [{ color: "#0f172a" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bytebybyte.id",
    title: "ByteByByte - Platform E-Learning Coding",
    description: "Belajar coding melalui kursus-kursus interaktif dengan materi berkualitas tinggi",
    siteName: "ByteByByte",
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteByByte - Platform E-Learning Coding",
    description: "Belajar coding melalui kursus-kursus interaktif dengan materi berkualitas tinggi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary-foreground relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
          <Header />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          
          {/* WhatsApp Modal dengan delay 20 detik dan hanya tampil sekali per sesi */}
          <WhatsAppModal 
            whatsappLink={WHATSAPP_GROUP_LINK}
            delay={20000}
            showOnce={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
