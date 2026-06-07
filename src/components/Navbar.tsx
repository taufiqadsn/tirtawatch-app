"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Peta Laporan", href: "/peta-laporan" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            TW
          </span>
          <span className="text-lg font-bold text-slate-800">TirtaWatch</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar user + tombol menu mobile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            JN
          </div>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="text-slate-600 md:hidden"
            aria-label="Buka menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu versi mobile (muncul saat hamburger ditekan) */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
