"use client";

import { useState, useMemo } from "react";
import { CATEGORIES, getTimeLabel } from "@/lib/constants";

const STATUS_CONFIG = {
  baru: {
    label: "Laporan Baru",
    bg: "bg-sky-100",
    text: "text-sky-700",
  },
  proses: {
    label: "Dalam Proses",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  selesai: {
    label: "Selesai",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

const TIME_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "1h", label: "1 Jam" },
  { value: "6h", label: "6 Jam" },
  { value: "24h", label: "24 Jam" },
];

export default function LiveFeed({ reports = [], onReportClick }) {
  const [timeFilter, setTimeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { value: "all", label: "Semua Kategori" },
    ...Object.entries(CATEGORIES).map(([key, value]) => ({
      value: key,
      label: value.label,
    })),
  ];

  const filtered = useMemo(() => {
    let result = [...reports];

    if (timeFilter !== "all") {
      const hours = parseInt(timeFilter);
      const cutoff = Date.now() - hours * 3600000;

      result = result.filter(
        (report) => new Date(report.createdAt).getTime() > cutoff
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((report) => report.category === categoryFilter);
    }

    return result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [reports, timeFilter, categoryFilter]);

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          <h3 className="font-bold text-navy text-xl">Live Feed</h3>
        </div>

        <span className="text-sm font-medium text-ink-mute bg-white px-3 py-1 rounded-full border border-sky-100">
          {filtered.length} laporan
        </span>
      </div>

      <div className="flex gap-3 mb-5">
        <select
          value={timeFilter}
          onChange={(event) => setTimeFilter(event.target.value)}
          className="flex-1 text-sm font-medium border border-sky-200 rounded-xl px-3 py-2.5 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition cursor-pointer"
        >
          {TIME_FILTERS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="flex-1 text-sm font-medium border border-sky-200 rounded-xl px-3 py-2.5 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition cursor-pointer"
        >
          {categoryOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center h-full">
            <p className="text-base font-semibold text-ink-mute">
              Tidak ada laporan
            </p>

            <p className="text-sm text-ink-soft mt-1">
              Coba ubah filter waktu atau kategori
            </p>
          </div>
        ) : (
          filtered.map((report) => {
            const category = CATEGORIES[report.category];
            const status = STATUS_CONFIG[report.status] || STATUS_CONFIG.baru;

            return (
              <button
                key={report.id}
                type="button"
                onClick={() => onReportClick?.(report)}
                className="w-full text-left flex gap-4 p-4 rounded-2xl bg-white border border-sky-100 shadow-sm hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sky-50 shadow-inner">
                  <img
                    src={report.beforeImage}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: category?.color + "20",
                        color: category?.color,
                      }}
                    >
                      {category?.label}
                    </span>

                    <span className="text-[11px] text-ink-soft ml-auto font-medium">
                      {getTimeLabel(report.createdAt)}
                    </span>
                  </div>

                  <p className="font-bold text-ink text-sm sm:text-base leading-tight truncate mb-1.5">
                    {report.title}
                  </p>

                  <p className="text-xs text-ink-mute truncate mb-2.5">
                    📍 {report.location}
                  </p>

                  <div className="flex items-center">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}