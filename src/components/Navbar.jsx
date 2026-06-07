"use client";

import Link from "next/link";
// 1. Tambahkan `useRouter` ke dalam import next/navigation
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { IconPlus, IconMenu } from "./Icons";
import { useAuth } from "@/lib/auth"; 

// Navigasi untuk halaman umum / Landing Page (Guest)
const publicLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#faq", label: "FAQ" },
  { href: "/peta", label: "Peta Laporan" },
  { href: "/admin/login", label: "Admin" },
];

// Navigasi khusus saat User sudah Login / berada di dalam Dashboard
const dashboardLinks = [
  { href: "/dashboard_user", label: "Beranda" },
  { href: "/peta", label: "Peta Laporan" },
  { href: "/lapor", label: "Form Laporan" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  // 2. Inisialisasi router di sini
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = user ? dashboardLinks : publicLinks;

  const isActive = (href) => {
    const pathWithoutHash = href.split("#")[0];
    if (pathWithoutHash === "/" || pathWithoutHash === "/dashboard_user") {
      return pathname === pathWithoutHash;
    }
    return pathname.startsWith(pathWithoutHash);
  };

  // 3. Buat fungsi handler logout terpusat agar melakukan redirect halaman
  const handleLogout = async () => {
    try {
      await logout(); // Jalankan fungsi hapus session/state user
      setOpen(false); // Tutup menu mobile jika sedang terbuka
      router.push("/"); // 🚀 Lempar user ke halaman utama/landing page umum
      router.refresh(); // Segarkan state router agar Next.js membersihkan cache halaman dashboard
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-line">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        
        {/* Logo dinamis */}
        <Link href={user ? "/dashboard_user" : "/"} className="shrink-0">
          <Logo variant="wide" className="h-10 w-48 object-contain object-left" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-lg text-sky-700 hover:text-sky-600 hover:bg-sky-50 transition ${
                isActive(l.href) ? "font-bold bg-sky-50/50 text-sky-600" : "font-semibold"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Action Buttons (Desktop & Tablet) */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm font-semibold text-navy">Halo, {user.name}!</span>
              {/* 4. Ubah onClick dari 'logout' menjadi 'handleLogout' */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-glow transition"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-navy hover:bg-slate-100 transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-glow transition"
              >
                Daftar
              </Link>
            </>
          )}

          {/* Hamburger Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <IconMenu className="w-[22px] h-[22px] text-navy-deep" />
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden border-t border-line bg-white px-5 py-4 space-y-2 text-sm font-semibold shadow-lg">
          {/* Menu Links */}
          <div className="space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sky-700 hover:text-sky-600 hover:bg-sky-50 transition ${
                  isActive(l.href) ? "font-bold bg-sky-50 text-sky-600" : "font-semibold"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-line my-2" />

          {/* Tombol Khusus Mobile */}
          <div className="pt-1 px-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <span className="text-xs text-ink-mute">Masuk sebagai: <b className="text-navy">{user.name}</b></span>
                {/* 5. Ubah onClick di mobile juga menggunakan 'handleLogout' */}
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  Keluar Akun
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-navy bg-slate-50 hover:bg-slate-100 transition border border-line"
                >
                  Masuk
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}