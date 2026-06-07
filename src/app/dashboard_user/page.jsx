"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { mapPoints } from "@/lib/data";
import { IconChevron } from "@/components/icons";
import { useAuth } from "@/lib/auth";

// Load map secara dinamis seperti di LandingPage
const LandingMap = dynamic(() => import("@/components/LandingMap"), { ssr: false });

// ─── KOMPONEN BANTUAN YANG SEBELUMNYA HILANG ────────────────────────────────

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(start);
      }, 16);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

function DashboardMapCard() {
  return (
    <div className="w-full rounded-[28px] bg-sky-50 p-4 shadow-card sm:p-6">
      <div className="relative overflow-hidden rounded-[22px] bg-sky-100">
        <LandingMap
          points={mapPoints}
          className="h-[240px] sm:h-[320px] lg:h-[350px]"
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href="/peta"
          className="inline-flex h-[50px] items-center justify-center rounded-2xl bg-sky-500 px-7 text-sm font-semibold text-white shadow-soft transition hover:bg-sky-600"
        >
          Lihat Peta Laporan
        </Link>
      </div>
    </div>
  );
}

// ─── DATA DUMMY SESUAI MOCKUP ───────────────────────────────────────────────

const dummyReports = [
  {
    id: "TW-00124",
    category: "Pipa Bocor",
    title: "Pipa Distribusi Utama Pecah",
    address: "Jl. Margonda Raya, No. 320, Depok, Jawa Barat",
    technician: "Surpiadi",
    estimation: "25 Mei 2026, 16.00 WIB",
    supports: 45,
    timeline: [
      { step: "Dilaporkan oleh Anda", time: "24 Mei 2026, 08.15 WIB", color: "bg-sky-400", active: true },
      { step: "Diverifikasi oleh Sistem", time: "24 Mei 2026, 15.15 WIB", color: "bg-green-500", active: true },
      { step: "Petugas Menuju Lokasi", time: "Menunggu update...", color: "bg-sky-400", active: true },
      { step: "Selesai Diperbaiki", time: "-", color: "bg-sky-400", active: true },
    ],
  },
  {
    id: "TW-00110",
    category: "Air Kotor/Berbau",
    title: "Air PDAM Keruh dan Bau",
    address: "Jl. Margonda Raya, No. 320, Depok, Jawa Barat",
    technician: "Mario",
    estimation: "12 Mei 2026, 13.01 WIB",
    supports: 105,
    timeline: [
      { step: "Dilaporkan oleh Anda", time: "11 Mei 2026, 08.15 WIB", color: "bg-sky-400", active: true },
      { step: "Diverifikasi oleh Sistem", time: "11 Mei 2026, 15.15 WIB", color: "bg-sky-400", active: true },
      { step: "Petugas Menuju Lokasi", time: "12 Mei 2026, 10.00 WIB", color: "bg-sky-400", active: true },
      { step: "Selesai Diperbaiki", time: "12 Mei 2026, 13.01 WIB", color: "bg-green-500", active: true },
    ],
  },
];

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────

export default function DashboardUser() {
  const { user } = useAuth(); 
  // Gunakan nama dari sistem Auth, atau fallback ke "Warga" jika belum termuat
  const userName = user?.name || "Warga"; 

  return (
    <>
      <Navbar />

      <main className="bg-white text-ink min-h-screen">
        
        {/* ─── HERO SECTION (Vibe Landing Page dengan Konteks Dashboard) ─── */}
        <section 
          className="relative overflow-hidden text-white" 
          style={{backgroundImage: "url('/foto-bg-dashboard.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}
        >
          <div className="absolute inset-0 bg-slate-900/10" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[-80px] top-[-80px] h-80 w-80 rounded-full bg-sky-400 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-sky-600 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[721px] max-w-7xl items-start gap-10 px-5 py-16 lg:grid-cols-[1fr_557px] lg:px-8 lg:py-20 lg:items-center">
            <div>
              <h1 className="max-w-[650px] text-[40px] font-bold leading-none text-sky-50 drop-shadow-md sm:text-[50px]">
                Hai, {userName}!<br />Apa kabar?
              </h1>

              <p className="mt-8 max-w-[598px] text-lg font-bold leading-[26px] text-sky-50 drop-shadow-md sm:text-xl">
                Pantau perkembangan, tahapan verifikasi, hingga status perbaikan laporan fasilitas air di lingkunganmu secara real-time dan transparan langsung dari sini.
              </p>

              <Link
                href="/lapor"
                className="mt-8 inline-flex h-[51px] w-[275px] items-center justify-center rounded-2xl bg-[#224B5F] text-xl font-semibold text-white shadow-md transition hover:brightness-110"
              >
                Laporkan Sekarang
              </Link>

              <div className="mt-12 flex flex-wrap gap-10 text-sky-50 lg:gap-12">
                <div>
                  <div className="text-[50px] font-bold leading-none drop-shadow-md">
                    <AnimatedCounter target={12} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Total Laporan
                  </p>
                </div>

                <div>
                  <div className="text-[50px] font-bold leading-none drop-shadow-md">
                    <AnimatedCounter target={4} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Sedang Diproses
                  </p>
                </div>

                <div>
                  <div className="text-[50px] font-bold leading-none drop-shadow-md">
                    <AnimatedCounter target={8} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Selesai Diproses
                  </p>
                </div>
              </div>
            </div>

            {/* Panggil komponen peta yang baru dibuat di atas */}
            <DashboardMapCard />
          </div>
        </section>

        {/* ─── DAFTAR LAPORANKU ─── */}
        <section className="px-5 py-16 lg:px-8 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Daftar Laporanku</h2>

            {/* Filter Dropdowns */}
            <div className="mt-6 flex flex-wrap gap-4">
              {['Waktu', 'Kategori', 'Status'].map((filter) => (
                <div key={filter} className="relative inline-flex items-center">
                  <select className="appearance-none rounded-full border border-gray-200 bg-white py-2 pl-5 pr-10 text-sm font-medium text-ink outline-none hover:bg-gray-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer">
                    <option>{filter}</option>
                  </select>
                  <IconChevron className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>

            {/* List Cards */}
            <div className="mt-10 space-y-8">
              {dummyReports.map((report) => (
                <div key={report.id} className="flex flex-col overflow-hidden rounded-[24px] bg-[#EEF6FB] p-6 lg:flex-row lg:gap-10 lg:p-10 shadow-sm transition hover:shadow-md">
                  
                  {/* Kolom Kiri: Info & Timeline */}
                  <div className="flex-1">
                    <span className="inline-block rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider shadow-sm">
                      {report.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold text-ink">{report.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.address}</p>

                    {/* Vertical Timeline */}
                    <div className="mt-8 relative ml-4 space-y-6 border-l-[3px] border-gray-300">
                      {report.timeline.map((item, idx) => (
                        <div key={idx} className="relative pl-8">
                          <div className={`absolute -left-[14px] top-1 h-6 w-6 rounded-full border-4 border-[#EEF6FB] ${item.color}`} />
                          <h4 className="text-lg font-bold text-ink leading-none">{item.step}</h4>
                          <p className="mt-1 text-sm text-gray-500">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kolom Kanan: Foto & Info Teknisi */}
                  <div className="mt-10 flex-1 lg:mt-0 lg:max-w-[380px]">
                    <h4 className="text-lg font-bold text-ink">Foto Bukti</h4>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="aspect-square rounded-xl bg-sky-500 object-cover shadow-sm"></div>
                      <div className="aspect-square rounded-xl bg-sky-500 object-cover shadow-sm"></div>
                    </div>

                    <p className="mt-8 text-sm font-semibold text-gray-500">Info Penanggungjawab Teknisi</p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      {/* Box Teknisi & Estimasi */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          </div>
                          <span className="text-sm font-semibold text-ink">{report.technician}</span>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                          </div>
                          <div>
                            <span className="block text-xs text-gray-500">Estimasi</span>
                            <span className="block text-sm font-semibold text-ink leading-tight mt-1">{report.estimation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Box Bagikan */}
                      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-500 mb-3">Bagikan</span>
                        <div className="flex flex-wrap gap-2">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                               <div className="w-4 h-4 bg-gray-400 rounded-full opacity-50"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Badge Dukungan */}
                    <div className="mt-5 inline-block rounded-lg bg-[#FFF4CD] px-4 py-2 border border-amber-200 shadow-sm">
                      <span className="text-sm font-bold text-[#B08500]">{report.supports} warga mendukung</span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Button Lihat Selengkapnya */}
            <div className="mt-10 flex justify-center">
              <button className="rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sky-600">
                Lihat Selengkapnya (2)
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
