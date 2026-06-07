"use client";
// COMPONENT: AdminSidebar — navigasi panel instansi.
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { IconLogout } from "./Icons";

const items = [
  { href: "/admin", label: "Dashboard", key: "dash",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>) },
  { href: "/admin/laporan", label: "Daftar Laporan", key: "list",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>) },
  { href: "/peta", label: "Peta", key: "map",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>) },
];

export default function AdminSidebar({ open }) {
  const pathname = usePathname();
  const active = (href) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <aside className={`w-[260px] shrink-0 bg-navy-deep text-white min-h-screen p-5 flex flex-col fixed lg:static inset-y-0 left-0 z-50 transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <Link href="/admin" className="px-2 py-2"><Logo size={26} wordColor="#fff" /></Link>
      <nav className="mt-6 space-y-1 text-sm flex-1">
        {items.map((it) => (
          <Link key={it.key} href={it.href} className={`adm-link ${active(it.href) ? "active" : ""}`}>
            {it.icon}{it.label}
          </Link>
        ))}
        <span className="adm-link cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg>Instansi
        </span>
        <span className="adm-link cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>Pengaturan
        </span>
      </nav>
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-sky-500 grid place-items-center font-bold text-sm">PD</div>
          <div className="text-xs"><div className="font-semibold">Admin PDAM</div><div className="text-slate-400">Bandung</div></div>
        </div>
        <Link href="/admin/login" className="mt-3 flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5">
          <IconLogout className="w-4 h-4" />Keluar
        </Link>
      </div>
    </aside>
  );
}
