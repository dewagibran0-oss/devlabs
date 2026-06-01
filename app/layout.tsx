import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

// Setup font premium (Inter)
const inter = Inter({ subsets: ["latin"] });

// Setup SEO Dasar
export const metadata: Metadata = {
  title: "Premium Digital Agency | Solusi Website & App",
  description: "Kami membantu bisnis berkembang melalui solusi digital modern, cepat, aman, dan scalable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Menambahkan overflow-x-hidden di html
    <html lang="id" className="scroll-smooth overflow-x-hidden"suppressHydrationWarning>
      <body className={`${inter.className} bg-[#050505] text-white antialiased overflow-x-hidden`}>
        {/* Navbar dipanggil di sini */}
        <Navbar />
        
        {/* Konten halaman akan dirender di sini */}
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}