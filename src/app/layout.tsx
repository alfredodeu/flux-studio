import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flux Studio",
  description: "KI-Bildgenerierung mit ComfyUI und Ollama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className={`${geist.className} bg-gray-950 text-white min-h-screen`}>
        <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-violet-400">Flux Studio</span>
            <span className="text-xs text-gray-500 hidden sm:block">ComfyUI + Ollama</span>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/"
              className="text-gray-300 hover:text-violet-400 transition-colors"
            >
              Studio
            </Link>
            <Link
              href="/gallery"
              className="text-gray-300 hover:text-violet-400 transition-colors"
            >
              Galerie
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
