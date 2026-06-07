"use client";
// COMPONENT: AdminShell — kerangka panel admin (sidebar + topbar + konten).
// Halaman admin cukup membungkus kontennya: <AdminShell title="...">...</AdminShell>
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { IconMenu, IconBell, IconSearch } from "./Icons";

export default function AdminShell({ title, subtitle, children, search = true }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar open={open} />
      {open && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <main className="flex-1 min-w-0">
        <div className="bg-white border-b border-line px-6 py-4 flex items-center justify-between gap-3 sticky top-0 z-30">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(true)} aria-label="Buka menu">
            <IconMenu className="w-[22px] h-[22px] text-navy-deep" />
          </button>
          {search ? (
            <div className="relative hidden sm:block flex-1 max-w-sm">
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input placeholder="Cari nomor tiket / lokasi…" className="w-full rounded-xl border border-line pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400" />
            </div>
          ) : <div className="flex-1" />}
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-slate-100 text-ink-soft">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-danger-dot" />
            </button>
            <div className="w-9 h-9 rounded-full bg-sky-100 grid place-items-center font-bold text-sky-700 text-sm">PD</div>
          </div>
        </div>
        <div className="p-6 lg:p-8">
          {title && <h1 className="text-3xl font-extrabold text-navy">{title}</h1>}
          {subtitle && <p className="text-ink-mute mt-1">{subtitle}</p>}
          <div className={title ? "mt-7" : ""}>{children}</div>
        </div>
      </main>
    </div>
  );
}
