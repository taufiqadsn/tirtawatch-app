import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { getReportByTicket } from "@/lib/reports";
import { statusMeta } from "@/lib/constants";
import { IconBack, IconCamera } from "@/components/Icons";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Laporan #${resolvedParams.id} — TirtaWatch`,
  };
}

const ORDER = ["baru", "proses", "selesai"];

function makeTimeline(report) {
  return [
    {
      key: "baru",
      title: "Menunggu Konfirmasi",
      time: `${report.date} · laporan diterima sistem`,
    },
    {
      key: "proses",
      title: "Sedang Ditangani",
      time:
        report.status === "baru"
          ? "menunggu verifikasi petugas"
          : report.estimatedFinish !== "-"
          ? `estimasi selesai: ${report.estimatedFinish}`
          : "petugas sedang menindaklanjuti laporan",
    },
    {
      key: "selesai",
      title: "Selesai",
      time: report.resolvedAt
        ? "perbaikan telah diselesaikan"
        : "menunggu konfirmasi perbaikan",
    },
  ];
}

export default async function DetailLaporanPage({ params }) {
  const resolvedParams = await params;
  const report = await getReportByTicket(resolvedParams.id);

  if (!report) {
    notFound();
  }

  const currentIdx = ORDER.indexOf(report.status);
  const timeline = makeTimeline(report);

  return (
    <>
      <Navbar />

      <div className="bg-sky-50/60 min-h-[80vh]">
        <div className="max-w-5xl mx-auto px-5 py-10 lg:py-14">
          <Link
            href="/peta"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-mute hover:text-sky-700 transition"
          >
            <IconBack className="w-4 h-4" />
            Kembali ke peta
          </Link>

          <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-3xl font-extrabold text-navy">
              Laporan #{report.id}
            </h1>

            <StatusBadge status={report.status} size="lg" />
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <div className="rounded-4xl overflow-hidden border border-line shadow-soft bg-white">
              <div className="h-72 lg:h-full min-h-[280px] bg-sky-50 grid place-items-center">
                {report.beforeImage ? (
                  <img
                    src={report.beforeImage}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-sky-700 text-center">
                    <IconCamera className="w-12 h-12 mx-auto" />
                    <div className="mt-2 text-sm font-semibold">
                      Foto laporan warga
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl bg-white border border-line shadow-soft p-6">
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

              <div className="rounded-4xl bg-white border border-line shadow-soft p-6">
                <h2 className="text-lg font-extrabold text-navy">
                  Status Penanganan
                </h2>

                <ol className="mt-5 relative border-l-2 border-line ml-3 space-y-6">
                  {timeline.map((item, index) => {
                    const reached = index <= currentIdx;
                    const isCurrent = index === currentIdx;
                    const dot = reached ? statusMeta[item.key].dot : "#E2E8F0";

                    return (
                      <li key={item.key} className="pl-6 relative">
                        <span
                          className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full ring-4 ${
                            isCurrent ? "animate-pulse" : ""
                          }`}
                          style={{
                            background: dot,
                            boxShadow: `0 0 0 4px ${
                              reached ? statusMeta[item.key].dot + "22" : "#fff"
                            }`,
                          }}
                        />

                        <div
                          className={`font-semibold text-sm ${
                            reached ? "text-navy" : "text-ink-faint"
                          }`}
                        >
                          {item.title}
                        </div>

                        <div
                          className={`text-xs ${
                            reached ? "text-ink-mute" : "text-ink-faint"
                          }`}
                        >
                          {item.time}
                        </div>
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
      <dt className="w-28 shrink-0 text-ink-mute font-semibold">
        {label}
      </dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}