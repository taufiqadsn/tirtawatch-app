import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import StatusBadge from "@/components/StatusBadge";
import AdminStatusForm from "@/components/AdminStatusForm";
import { getReportByTicket } from "@/lib/reports";
import { IconBack, IconCamera } from "@/components/Icons";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Detail #${resolvedParams.id} — TirtaWatch Admin`,
  };
}

export default async function AdminDetailPage({ params }) {
  const resolvedParams = await params;
  const reportId = resolvedParams.id;

  // Cek di terminal apakah ID sudah terbaca dengan benar
  console.log("Mencari laporan dengan ID/Tiket:", reportId);

  const report = await getReportByTicket(reportId);

  if (!report) {
    notFound();
  }

  return (
    <AdminShell search={false}>
      <Link
        href="/admin/laporan"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mute hover:text-sky-700 transition"
      >
        <IconBack className="w-4 h-4" />
        Daftar Laporan
      </Link>

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-extrabold text-navy">
          Detail Laporan #{report.id}
        </h1>

        <StatusBadge status={report.status} size="lg" />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="rounded-4xl overflow-hidden border border-line shadow-card bg-white">
          <div className="h-72 lg:min-h-[340px] bg-sky-50 grid place-items-center">
            {report.beforeImage ? (
              <img
                src={report.beforeImage}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-sky-700">
                <IconCamera className="w-11 h-11 mx-auto" />
                <div className="mt-2 text-sm font-semibold">
                  Foto bukti laporan warga
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-4xl bg-white border border-line shadow-card p-6">
          <h2 className="text-lg font-extrabold text-navy">
            Informasi Laporan
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Kategori" value={report.categoryLabel} />
            <Row label="Lokasi" value={report.location} />
            <Row label="Koordinat" value={`${report.lat}, ${report.lng}`} />
            <Row label="Waktu" value={report.date} />
            <Row label="Pelapor" value={report.reporter} />
            <Row label="Dukungan" value={`${report.supportCount} warga`} />
            <Row label="Teknisi" value={report.technicianName} />
            <Row label="Estimasi" value={report.estimatedFinish} />
            <Row label="Deskripsi" value={report.description} />
          </dl>
        </div>
      </div>

      <AdminStatusForm report={report} />
    </AdminShell>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-4">
      <dt className="w-28 shrink-0 text-ink-mute font-semibold">
        {label}
      </dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}