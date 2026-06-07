import Link from "next/link";

const footerColumns = [
  {
    title: "Navigasi",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Peta Laporan", href: "/peta-laporan" },
      { label: "Cara Kerja", href: "#cara-kerja" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Pusat Bantuan", href: "#" },
      { label: "Hubungi Kami", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { label: "halo@tirtawatch.id", href: "mailto:halo@tirtawatch.id" },
      { label: "(021) 1500-456", href: "tel:0211500456" },
      { label: "Jakarta, Indonesia", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-blue-50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Kolom brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-blue-500" />
              <span className="text-2xl font-bold text-slate-800">
                TirtaWatch
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Platform pelaporan masalah air berbasis lokasi yang transparan.
              Laporkan, pantau, dan dukung perbaikan layanan air di sekitarmu.
            </p>
          </div>

          {/* Kolom link */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-slate-800">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Garis bawah copyright */}
        <div className="mt-12 border-t border-blue-100 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} TirtaWatch. Seluruh hak cipta
          dilindungi.
        </div>
      </div>
    </footer>
  );
}
