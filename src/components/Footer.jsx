import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-sky-50 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="square" className="h-24 w-24" />
          <p className="mt-4 text-sm text-ink-mute leading-relaxed max-w-xs">
            Platform pelaporan masalah air bersih berbasis warga. Foto, kirim, pantau — dalam hitungan detik.
          </p>
          <p className="mt-4 text-xs text-ink-faint">Mendukung SDG 6 — Air Bersih &amp; Sanitasi Layak.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-navy mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm text-ink-mute">
            <li><Link href="/" className="hover:text-sky-700">Beranda</Link></li>
            <li><Link href="/peta" className="hover:text-sky-700">Peta Laporan</Link></li>
            <li><Link href="/lapor" className="hover:text-sky-700">Buat Laporan</Link></li>
            <li><Link href="/login" className="hover:text-sky-700">Masuk / Daftar</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-navy mb-3">Untuk Instansi</h4>
          <ul className="space-y-2 text-sm text-ink-mute">
            <li><Link href="/admin/login" className="hover:text-sky-700">Login Petugas</Link></li>
            <li><span className="cursor-pointer hover:text-sky-700">Dashboard PDAM</span></li>
            <li><span className="cursor-pointer hover:text-sky-700">Langganan SaaS</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-navy mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm text-ink-mute">
            <li>halo@tirtawatch.id</li>
            <li>WhatsApp: 0811-xxxx-xxxx</li>

            <li className="flex gap-3 pt-2">
              <a
                href="https://instagram.com/tirtawatch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-md text-sky-700 hover:text-[#E1306C] hover:scale-110 transition-all duration-200"
                title="Instagram TirtaWatch"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://x.com/tirtawatch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-md text-sky-700 hover:text-black hover:scale-110 transition-all duration-200"
                title="X (Twitter) TirtaWatch"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@tirtawatch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-md text-sky-700 hover:text-[#00f2fe] hover:scale-110 transition-all duration-200"
                title="TikTok TirtaWatch"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.17 1.13 1.2 2.75 1.9 4.43 2.05v3.82c-1.84-.07-3.61-.78-4.99-2-.13-.11-.26-.22-.38-.34v6.52c.06 2.95-1.52 5.75-4.14 7.11-2.9 1.5-6.53 1.13-9.04-1.1-2.43-2.11-3.23-5.63-1.92-8.68 1.22-2.88 4.29-4.66 7.43-4.44v3.89c-1.74-.17-3.41.69-4.11 2.29-.79 1.8.11 4.01 1.96 4.67 1.83.66 3.96-.21 4.56-2.04.12-.37.16-.76.16-1.15V0h.01z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/tirtawatch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-md text-sky-700 hover:text-[#1877F2] hover:scale-110 transition-all duration-200"
                title="Facebook TirtaWatch"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-faint">
          <span>© 2026 TirtaWatch — Kelompok 14. Final Project.</span>
          <span>Dibuat untuk kepentingan demo akademik.</span>
        </div>
      </div>
    </footer>
  );
}
