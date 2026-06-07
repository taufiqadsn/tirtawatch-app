import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "TirtaWatch — Lapor Masalah Air Bersih",
  description: "Platform pelaporan masalah air bersih berbasis warga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-white text-ink font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
