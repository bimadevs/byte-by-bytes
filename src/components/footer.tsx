import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 px-4 md:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ByteByByte. Hak Cipta Dilindungi.
        </p>
        <div className="flex items-center gap-4">
          <Link 
            href="/kursus" 
            className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
          >
            Kursus
          </Link>
          <Link 
            href="/tentang" 
            className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
          >
            Tentang
          </Link>
          <Link 
            href="/kebijakan-privasi" 
            className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
          >
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </footer>
  );
} 