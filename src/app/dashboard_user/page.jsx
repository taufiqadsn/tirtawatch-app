"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { IconChevron } from "@/components/Icons";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabaseClient";

const LandingMap = dynamic(() => import("@/components/LandingMap"), {
  ssr: false,
});


function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else setCount(start);
        }, 16);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

function DashboardMapCard({ points }) {
  return (
    <div className="w-full rounded-[28px] bg-sky-50 p-4 shadow-card sm:p-6">
      <div className="relative overflow-hidden rounded-[22px] bg-sky-100">
        <LandingMap
          points={points}
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


function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB"
  );
}

function generateTimeline(report) {
  const status = (report.status || "baru").toLowerCase();
  const isProses = status === "proses" || status === "selesai";
  const isSelesai = status === "selesai";

  return [
    {
      step: "Dilaporkan oleh Anda",
      time: formatDate(report.created_at),
      color: "bg-sky-400",
      active: true,
    },
    {
      step: "Diverifikasi & Diproses",
      time: isProses ? formatDate(report.updated_at) : "Menunggu verifikasi...",
      color: isProses ? "bg-sky-400" : "bg-slate-300",
      active: isProses,
    },
    {
      step: "Petugas Menuju Lokasi",
      time: isProses ? "Sedang ditangani" : "-",
      color: isProses ? "bg-sky-400" : "bg-slate-300",
      active: isProses,
    },
    {
      step: "Selesai Diperbaiki",
      time: isSelesai
        ? formatDate(report.finished_at || report.updated_at)
        : "-",
      color: isSelesai ? "bg-green-500" : "bg-slate-300",
      active: isSelesai,
    },
  ];
}

export default function DashboardUser() {
  const { user } = useAuth();
  const userName = user?.name || "Warga";

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, proses: 0, selesai: 0 });
  const [mapPoints, setMapPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return;

    if (!user || !user.id) {
      console.error(
        "Gagal mendapatkan ID pengguna. Pastikan Anda sudah login.",
        user,
      );
      return;
    }

    const fetchMyReports = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/laporan?userId=${user.id}`);

        if (!response.ok) throw new Error("Terjadi masalah pada server API");

        const data = await response.json();
        console.log("CEK DATA DARI API:", data);

        if (data.success) {
          const fetchedReports = data.reports;

          let proses = 0;
          let selesai = 0;
          const points = [];

          fetchedReports.forEach((r) => {
            const status = (r.status || "").toLowerCase();
            if (status === "proses") proses++;
            if (status === "selesai") selesai++;

            if (r.latitude && r.longitude) {
              points.push({
                id: r.id,
                lat: r.latitude,
                lng: r.longitude,
                status: r.status,
              });
            }
          });

          setStats({ total: fetchedReports.length, proses, selesai });
          setMapPoints(points);
          setReports(fetchedReports);
        }
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [user]);

  return (
    <>
      <Navbar />

      <main className="bg-white text-ink min-h-screen">
        <section
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage: "url('/foto-bg-dashboard.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/10" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[-80px] top-[-80px] h-80 w-80 rounded-full bg-sky-400 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-sky-600 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[721px] max-w-7xl items-start gap-10 px-5 py-16 lg:grid-cols-[1fr_557px] lg:px-8 lg:py-20 lg:items-center">
            <div>
              <h1 className="max-w-[650px] text-[40px] font-bold leading-none text-sky-50 drop-shadow-md sm:text-[50px]">
                Hai, {userName}!<br />
                Apa kabar?
              </h1>

              <p className="mt-8 max-w-[598px] text-lg font-bold leading-[26px] text-sky-50 drop-shadow-md sm:text-xl">
                Pantau perkembangan, tahapan verifikasi, hingga status perbaikan
                laporan fasilitas air di lingkunganmu secara real-time dan
                transparan langsung dari sini.
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
                    <AnimatedCounter target={stats.total} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Total Laporan
                  </p>
                </div>
                <div>
                  <div className="text-[50px] font-bold leading-none drop-shadow-md">
                    <AnimatedCounter target={stats.proses} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Sedang Diproses
                  </p>
                </div>
                <div>
                  <div className="text-[50px] font-bold leading-none drop-shadow-md">
                    <AnimatedCounter target={stats.selesai} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Selesai Diproses
                  </p>
                </div>
              </div>
            </div>

            <DashboardMapCard points={mapPoints} />
          </div>
        </section>
        <section className="px-5 py-16 lg:px-8 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Daftar Laporanku
            </h2>

            <div className="mt-6 flex flex-wrap gap-4">
              {["Waktu", "Kategori", "Status"].map((filter) => (
                <div key={filter} className="relative inline-flex items-center">
                  <select className="appearance-none rounded-full border border-gray-200 bg-white py-2 pl-5 pr-10 text-sm font-medium text-ink outline-none hover:bg-gray-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer">
                    <option>{filter}</option>
                  </select>
                  <IconChevron className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>

            {loading ? (
              <div className="mt-10 py-12 text-center text-gray-500 font-medium">
                Memuat data laporan Anda...
              </div>
            ) : reports.length === 0 ? (
              <div className="mt-10 py-12 text-center rounded-[24px] border-2 border-dashed border-gray-200 bg-gray-50">
                <p className="text-gray-500 font-medium">
                  Anda belum membuat laporan apapun.
                </p>
                <Link
                  href="/lapor"
                  className="mt-3 inline-block font-semibold text-sky-600 hover:underline"
                >
                  Buat laporan pertama
                </Link>
              </div>
            ) : (
              <div className="mt-10 space-y-8">
                {reports.map((report) => {
                  const timeline = generateTimeline(report);

                  return (
                    <div
                      key={report.id}
                      className="flex flex-col overflow-hidden rounded-[24px] bg-[#EEF6FB] p-6 lg:flex-row lg:gap-10 lg:p-10 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex-1">
                        <span className="inline-block rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider shadow-sm">
                          {report.category_key || report.categoryLabel}
                        </span>
                        <h3 className="mt-3 text-2xl font-bold text-ink">
                          {report.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {report.location}
                        </p>

                        <div className="mt-8 relative ml-4 space-y-6 border-l-[3px] border-gray-300">
                          {timeline.map((item, idx) => (
                            <div
                              key={idx}
                              className={`relative pl-8 ${!item.active ? "opacity-50" : ""}`}
                            >
                              <div
                                className={`absolute -left-[14px] top-1 h-6 w-6 rounded-full border-4 border-[#EEF6FB] ${item.color}`}
                              />
                              <h4 className="text-lg font-bold text-ink leading-none">
                                {item.step}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-10 flex-1 lg:mt-0 lg:max-w-[380px]">
                        <h4 className="text-lg font-bold text-ink">
                          Foto Bukti
                        </h4>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <Image
                            src={report.before_image_url || "/foto-dummy-1.jpg"}
                            alt="Bukti Sebelum"
                            className="aspect-square w-full rounded-xl object-cover shadow-sm bg-gray-200"
                          />
                          <Image
                            src={
                              report.after_image_url || "/placeholder-after.jpg"
                            }
                            alt="Bukti Sesudah"
                            className="aspect-square w-full rounded-xl object-cover shadow-sm bg-gray-200"
                          />
                        </div>

                        <p className="mt-8 text-sm font-semibold text-gray-500">
                          Info Penanggungjawab Teknisi
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <svg
                                  className="w-5 h-5 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  ></path>
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-ink line-clamp-1">
                                {report.technician_name || "Belum ditugaskan"}
                              </span>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <svg
                                  className="w-5 h-5 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                  ></path>
                                </svg>
                              </div>
                              <div>
                                <span className="block text-xs text-gray-500">
                                  Estimasi
                                </span>
                                <span className="block text-sm font-semibold text-ink leading-tight mt-1">
                                  {report.estimated_finish
                                    ? formatDate(report.estimated_finish)
                                    : "-"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col items-start">
                            <span className="text-sm font-semibold text-gray-500 mb-3">
                              Bagikan
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                                >
                                  <div className="w-4 h-4 bg-gray-400 rounded-full opacity-50"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 inline-block rounded-lg bg-[#FFF4CD] px-4 py-2 border border-amber-200 shadow-sm">
                          <span className="text-sm font-bold text-[#B08500]">
                            {report.support_count || 0} warga mendukung
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {reports.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button className="rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sky-600">
                  Lihat Selengkapnya
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
