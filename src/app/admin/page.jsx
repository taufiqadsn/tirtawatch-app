import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import ReportMap from "@/components/ReportMap";
import {
  getReports,
  getReportStats,
  getMapPoints,
  getCategoryStats,
} from "@/lib/reports";
import { CATEGORIES } from "@/lib/constants";
import { IconClock, IconCheck } from "@/components/Icons";

export const metadata = {
  title: "Dashboard — TirtaWatch Admin",
};

export default async function AdminDashboardPage() {
  const reports = await getReports({ limit: 5 });
  const stats = await getReportStats();
  const mapPoints = await getMapPoints();
  const categoryStats = await getCategoryStats();

  return (
    <AdminShell
      title="Dashboard Instansi"
      subtitle="Pantau laporan warga, prioritas lokasi, dan progres penanganan."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value={stats.total}
          label="Total Laporan"
          tone="sky"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          }
        />

        <StatCard
          value={stats.baru}
          label="Menunggu"
          tone="warn"
          icon={<IconClock className="w-[22px] h-[22px]" />}
        />

        <StatCard
          value={stats.proses}
          label="Ditangani"
          tone="sky"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 0-5.6 0l-1 1 1.4 1.4 1-1a2 2 0 0 1 2.8 2.8l-1 1 1.4 1.4 1-1a4 4 0 0 0 0-5.6Z" />
              <path d="M6.3 14.7l1-1 1.4 1.4-1 1a2 2 0 0 0 2.8 2.8l1-1 1.4 1.4-1 1a4 4 0 0 1-5.6-5.6Z" />
            </svg>
          }
        />

        <StatCard
          value={stats.selesai}
          label="Selesai"
          tone="ok"
          icon={<IconCheck className="w-[22px] h-[22px]" />}
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-line shadow-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-navy">
              Laporan Terbaru
            </h2>

            <Link
              href="/admin/laporan"
              className="text-sm font-semibold text-sky-700 hover:underline"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-ink-mute border-b border-line">
                  <th className="pb-3 pr-4">Tiket</th>
                  <th className="pb-3 pr-4">Kategori</th>
                  <th className="pb-3 pr-4">Lokasi</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="py-3.5 pr-4 font-semibold text-navy">
                      <Link
                        href={`/admin/laporan/${report.id}`}
                        className="hover:underline"
                      >
                        {report.id}
                      </Link>
                    </td>

                    <td className="py-3.5 pr-4 text-ink-soft">
                      {report.categoryLabel}
                    </td>

                    <td className="py-3.5 pr-4 text-ink-mute">
                      {report.location}
                    </td>

                    <td className="py-3.5">
                      <StatusBadge status={report.status} />
                    </td>
                  </tr>
                ))}

                {reports.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-ink-mute">
                      Belum ada laporan masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white border border-line shadow-card p-5">
            <h3 className="font-bold text-navy mb-3">Sebaran Laporan</h3>
            <ReportMap
              points={mapPoints}
              className="h-44"
              clusterLabel={`${stats.total} laporan`}
            />
          </div>

          <div className="rounded-3xl bg-white border border-line shadow-card p-5">
            <h3 className="font-bold text-navy mb-4">
              Distribusi Kategori
            </h3>

            <div className="space-y-3">
              {categoryStats.map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-soft font-medium">
                      {CATEGORIES[item.key]?.label}
                    </span>

                    <span className="text-ink-mute">{item.pct}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}