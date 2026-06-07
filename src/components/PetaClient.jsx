"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeafletMap from "@/components/LeafletMap";
import LiveFeed from "@/components/LiveFeed";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/lib/auth";

const FILTERS = [
  { value: "all", label: "Semua" },
  { value: "pipa_bocor", label: "Pipa Bocor" },
  { value: "saluran_mampet", label: "Saluran Mampet" },
  { value: "air_berwarna", label: "Air Berwarna / Bau" },
  { value: "limbah_ilegal", label: "Limbah Ilegal" },
];

function CounterNumber({ value }) {
  return (
    <span>
      {Number(value || 0).toLocaleString("id-ID")}
    </span>
  );
}

export default function PetaClient({ reports = [], stats }) {
  const { user } = useAuth();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    if (activeCategoryFilter === "all") return reports;

    return reports.filter((report) => report.category === activeCategoryFilter);
  }, [reports, activeCategoryFilter]);

  const resolvedReports = useMemo(() => {
    return reports.filter(
      (report) => report.status === "selesai" && report.afterImage
    );
  }, [reports]);

  return (
    <>
      <Navbar />

      <main className="bg-white text-ink">
        <section
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage: "url('/foto-bg-dashboard.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[-80px] top-[-80px] h-80 w-80 rounded-full bg-sky-400 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-sky-600 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20 min-h-[620px] flex flex-col justify-center">
            <h1 className="max-w-[650px] text-[40px] font-bold leading-none text-sky-50 drop-shadow-md sm:text-[50px]">
              Peta laporan masalah air secara real-time.
            </h1>

            <p className="mt-8 max-w-[598px] text-lg font-bold leading-[26px] text-sky-50 drop-shadow-md sm:text-xl">
              Pantau titik laporan warga, buka koordinat, dan lihat status
              penanganan yang datanya langsung berasal dari Supabase.
            </p>

            {user ? (
              <Link
                href="/lapor"
                className="mt-8 inline-flex h-[51px] w-[275px] items-center justify-center rounded-2xl bg-sky-500 text-xl font-semibold text-white shadow-glow transition hover:bg-sky-600"
              >
                Laporkan Masalah Baru
              </Link>
            ) : (
              <Link
                href="/login"
                className="mt-8 inline-flex h-[51px] w-[275px] items-center justify-center rounded-2xl bg-[#224B5F] text-xl font-semibold text-white shadow-md transition hover:brightness-110"
              >
                Gabung Sekarang
              </Link>
            )}

            <div className="mt-12 flex flex-wrap gap-10 text-sky-50 lg:gap-12">
              <div>
                <div className="text-[50px] font-bold leading-none drop-shadow-md">
                  <CounterNumber value={stats.total} />
                </div>
                <p className="mt-3 text-lg font-bold leading-[26px]">
                  Total Laporan
                </p>
              </div>

              <div>
                <div className="text-[50px] font-bold leading-none drop-shadow-md">
                  <CounterNumber value={stats.selesai} />
                </div>
                <p className="mt-3 text-lg font-bold leading-[26px]">
                  Sudah Selesai
                </p>
              </div>

              <div>
                <div className="text-[50px] font-bold leading-none drop-shadow-md">
                  <CounterNumber value={stats.proses} />
                </div>
                <p className="mt-3 text-lg font-bold leading-[26px]">
                  Dalam Proses
                </p>
              </div>

              <div>
                <div className="text-[50px] font-bold leading-none drop-shadow-md">
                  <CounterNumber value={stats.baru} />
                </div>
                <p className="mt-3 text-lg font-bold leading-[26px]">
                  Baru Dilaporkan
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8 bg-sky-50/40">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-4xl border border-line bg-white p-5 shadow-card">
                <div className="mb-4 flex flex-wrap gap-2">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setActiveCategoryFilter(filter.value)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                        activeCategoryFilter === filter.value
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="h-[520px] overflow-hidden rounded-3xl">
                  <LeafletMap
                    reports={filteredReports}
                    onMarkerClick={setSelectedReport}
                  />
                </div>
              </div>

              <div className="rounded-4xl border border-line bg-sky-50 p-5 shadow-card h-[620px]">
                <LiveFeed
                  reports={reports}
                  onReportClick={setSelectedReport}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-extrabold text-navy">
              Laporan yang Sudah Selesai
            </h2>

            <p className="mt-2 text-sm text-ink-mute">
              Bagian ini menampilkan laporan dengan status selesai dan bukti
              perbaikan.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {resolvedReports.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-line bg-slate-50 p-8 text-center text-ink-mute">
                  Belum ada laporan selesai.
                </div>
              ) : (
                resolvedReports.map((report) => (
                  <article
                    key={report.id}
                    className="overflow-hidden rounded-3xl border border-line bg-white shadow-card"
                  >
                    <div className="h-[240px]">
                      <ImageComparisonSlider
                        beforeImage={report.beforeImage}
                        afterImage={report.afterImage}
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-navy">
                        {report.title}
                      </h3>

                      <p className="mt-2 text-sm text-ink-mute line-clamp-2">
                        {report.description}
                      </p>

                      <div className="mt-4 text-xs text-ink-mute">
                        📍 {report.location}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white rounded-[28px] w-full max-w-sm shadow-[0_12px_28px_rgba(0,0,0,0.25)] overflow-hidden transition-all"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-44 relative">
              {selectedReport.afterImage ? (
                <ImageComparisonSlider
                  beforeImage={selectedReport.beforeImage}
                  afterImage={selectedReport.afterImage}
                />
              ) : (
                <img
                  src={selectedReport.beforeImage}
                  alt={selectedReport.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-navy text-lg flex-1 pr-2">
                  {selectedReport.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-2xl bg-sky-50 hover:bg-sky-100 transition"
                >
                  ✕
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor:
                      CATEGORIES[selectedReport.category]?.color + "20",
                    color: CATEGORIES[selectedReport.category]?.color,
                  }}
                >
                  {selectedReport.categoryLabel}
                </span>

                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                  {selectedReport.status}
                </span>
              </div>

              <p className="text-sm text-ink-mute mb-4 leading-relaxed">
                {selectedReport.description}
              </p>

              <div className="space-y-1.5 text-sm text-ink-mute border-b border-line pb-4 mb-4">
                <div>
                  📍 <span className="font-medium text-ink">Lokasi:</span>{" "}
                  {selectedReport.location}
                </div>

                <div>
                  👤 <span className="font-medium text-ink">Pelapor:</span>{" "}
                  {selectedReport.reporter}
                </div>

                <div>
                  👍 <span className="font-medium text-ink">Dukungan:</span>{" "}
                  {selectedReport.supportCount} warga mendukung
                </div>
              </div>

              <Link
                href={`/laporan/${selectedReport.id}`}
                className="inline-flex w-full h-11 items-center justify-center rounded-xl bg-sky-500 text-white text-sm font-bold hover:bg-sky-600"
              >
                Lihat Detail Status
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}