"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              ByteByByte
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/kursus" 
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              Semua Kursus
            </Link>
            <Link 
              href="/tentang" 
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              Tentang Kami
            </Link>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md p-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle tema</span>
          </button>
        </nav>
      </div>
    </header>
  );
} 