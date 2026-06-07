// PAGE: Detail Laporan publik — app/laporan/[id]/page.jsx (route "/laporan/TW-00124")
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { statusMeta } from "@/lib/data";
import { IconBack, IconCamera } from "@/components/Icons";

export function generateMetadata({ params }) {
  return { title: `Laporan #${params.id} — TirtaWatch` };
}

const TIMELINE = [
  { key: "baru", title: "Menunggu Konfirmasi", time: "21 Mei 2026, 09:42 · laporan diterima sistem" },
  { key: "proses", title: "Sedang Ditangani", time: "21 Mei 2026, 13:10 · teknisi PDAM menuju lokasi" },
  { key: "selesai", title: "Selesai", time: "menunggu konfirmasi perbaikan" },
];
const ORDER = ["baru", "proses", "selesai"];

export default function DetailLaporanPage({ params }) {
  // const report = getReport(params.id);
  const currentIdx = ORDER.indexOf(report.status);

  return (
    <>
      <Navbar />
      <div className="bg-sky-50/60 min-h-[80vh]">
        <div className="max-w-5xl mx-auto px-5 py-10 lg:py-14">
          <Link href="/peta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mute hover:text-sky-700 transition">
            <IconBack className="w-4 h-4" /> Kembali ke peta
          </Link>

          <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-3xl font-extrabold text-navy">Laporan #{report.id}</h1>
            <StatusBadge status={report.status} size="lg" />
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <div className="rounded-4xl overflow-hidden border border-line shadow-soft">
              <div className={`h-72 lg:h-full min-h-[280px] bg-gradient-to-br ${report.gradient} grid place-items-center`}>
                <div className="text-white/90 text-center">
                  <IconCamera className="w-12 h-12 mx-auto" />
                  <div className="mt-2 text-sm font-semibold">Foto laporan warga</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl bg-white border border-line shadow-soft p-6">
                <h2 className="text-lg font-extrabold text-navy">Informasi Laporan</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <Row label="Kategori" value={report.category} />
                  <Row label="Lokasi" value={report.location} />
                  <Row label="Koordinat" value={`${report.coords.lat}, ${report.coords.lng}`} />
                  <Row label="Waktu" value={report.date} />
                  <Row label="Pelapor" value={report.reporter} />
                  <Row label="Deskripsi" value={report.description} />
                </dl>
              </div>

              <div className="rounded-4xl bg-white border border-line shadow-soft p-6">
                <h2 className="text-lg font-extrabold text-navy">Status Penanganan</h2>
                <ol className="mt-5 relative border-l-2 border-line ml-3 space-y-6">
                  {TIMELINE.map((t, i) => {
                    const reached = i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    const dot = reached ? statusMeta[t.key].dot : "#E2E8F0";
                    return (
                      <li key={t.key} className="pl-6 relative">
                        <span className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full ring-4 ${isCurrent ? "animate-pulse" : ""}`} style={{ background: dot, boxShadow: `0 0 0 4px ${reached ? statusMeta[t.key].dot + "22" : "#fff"}` }} />
                        <div className={`font-semibold text-sm ${reached ? "text-navy" : "text-ink-faint"}`}>{t.title}</div>
                        <div className={`text-xs ${reached ? "text-ink-mute" : "text-ink-faint"}`}>{t.time}</div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-4">
      <dt className="w-28 shrink-0 text-ink-mute font-semibold">{label}</dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}
