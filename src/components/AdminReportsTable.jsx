"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { IconSearch } from "./Icons";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "baru", label: "Menunggu" },
  { key: "proses", label: "Ditangani" },
  { key: "selesai", label: "Selesai" },
];

export default function AdminReportsTable({ reports = [] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const rows = useMemo(() => {
    return reports
      .filter((report) => filter === "all" || report.status === filter)
      .filter((report) => {
        const search = query.toLowerCase();

        return (
          report.id.toLowerCase().includes(search) ||
          report.location.toLowerCase().includes(search) ||
          report.categoryLabel.toLowerCase().includes(search)
        );
      });
  }, [reports, filter, query]);

  const allChecked =
    rows.length > 0 && rows.every((report) => selected.includes(report.id));

  const toggleAll = () => {
    setSelected(allChecked ? [] : rows.map((report) => report.id));
  };

  const toggleOne = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const counts = {
    all: reports.length,
    baru: reports.filter((report) => report.status === "baru").length,
    proses: reports.filter((report) => report.status === "proses").length,
    selesai: reports.filter((report) => report.status === "selesai").length,
  };

  return (
    <div className="rounded-3xl bg-white border border-line shadow-card p-5">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`filter-chip ${filter === item.key ? "active" : ""}`}
            >
              {item.label} ({counts[item.key]})
            </button>
          ))}
        </div>

        <div className="relative">
          <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari tiket / lokasi"
            className="rounded-xl border border-line pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400 w-48"
          />
        </div>
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-sky-50 px-4 py-2.5 text-sm">
          <span className="font-semibold text-sky-700">
            {selected.length} dipilih
          </span>
          <span className="text-xs text-ink-mute">
            Perubahan massal bisa dikembangkan pada versi berikutnya.
          </span>
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-ink-mute border-b border-line">
              <th className="pb-3 pr-3">
                <input
                  type="checkbox"
                  className="accent-sky-500 w-4 h-4"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>

              <th className="pb-3 pr-4">Tiket</th>
              <th className="pb-3 pr-4">Foto</th>
              <th className="pb-3 pr-4">Kategori</th>
              <th className="pb-3 pr-4">Lokasi</th>
              <th className="pb-3 pr-4">Tanggal</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {rows.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50">
                <td className="py-3 pr-3">
                  <input
                    type="checkbox"
                    className="accent-sky-500 w-4 h-4"
                    checked={selected.includes(report.id)}
                    onChange={() => toggleOne(report.id)}
                  />
                </td>

                <td className="py-3 pr-4 font-semibold text-navy">
                  <Link
                    href={`/admin/laporan/${report.id}`}
                    className="hover:underline"
                  >
                    {report.id}
                  </Link>
                </td>

                <td className="py-3 pr-4">
                  <img
                    src={report.beforeImage}
                    alt={report.title}
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                </td>

                <td className="py-3 pr-4 text-ink-soft">
                  {report.categoryLabel}
                </td>

                <td className="py-3 pr-4 text-ink-mute">
                  {report.location}
                </td>

                <td className="py-3 pr-4 text-ink-mute">
                  {report.date}
                </td>

                <td className="py-3 pr-4">
                  <StatusBadge status={report.status} />
                </td>

                <td className="py-3">
                  <Link
                    href={`/admin/laporan/${report.id}`}
                    className="text-sky-700 font-semibold hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="py-10 text-center text-ink-mute">
                  Tidak ada laporan yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-ink-mute">
          Menampilkan {rows.length} dari {reports.length} laporan
        </span>
      </div>
    </div>
  );
}