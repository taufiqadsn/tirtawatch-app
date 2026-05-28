import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MapWrapper from "../../components/MapWrapper";

const stats = [
  { value: "12", label: "Laporan Baru", box: "bg-red-50", text: "text-red-600" },
  { value: "8", label: "Ditangani", box: "bg-blue-50", text: "text-blue-600" },
  { value: "150", label: "Selesai", box: "bg-green-50", text: "text-green-600" },
];

const reports = [
  {
    id: "TW-00124",
    title: "Pipa distribusi bocor",
    badge: "Laporan Baru",
    badgeStyle: "bg-red-100 text-red-700",
    cover: "bg-blue-400",
  },
  {
    id: "TW-00125",
    title: "Air keruh dan berbau",
    badge: "Sedang Ditangani",
    badgeStyle: "bg-blue-100 text-blue-700",
    cover: "bg-slate-400",
  },
  {
    id: "TW-00126",
    title: "Saluran mampet dan meluap",
    badge: "Selesai",
    badgeStyle: "bg-green-100 text-green-700",
    cover: "bg-slate-300",
  },
];

export default function PetaLaporanPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 pb-20">
        {/* Hero header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-sky-700 to-cyan-800">
          {/* Tambahkan foto air di public/images/ lalu pasang di sini bila mau */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative mx-auto max-w-6xl px-6 py-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-200">
              Public Map Dashboard
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Peta laporan masalah air secara real-time.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-100/90">
              Pantau titik laporan warga, buka koordinat langsung ke Google
              Maps, dan kirim laporan baru dengan foto, kategori, deskripsi,
              serta lokasi otomatis.
            </p>
          </div>
        </section>

        {/* Kartu dashboard utama (mt-10 memberi jarak lega dari hero) */}
        <section className="mx-auto mt-10 max-w-6xl px-6">
          <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-xl lg:grid-cols-3">
            {/* Kolom kiri: peta + statistik */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  Peta Laporan
                </h2>
                <a
                  href="https://www.google.com/maps?q=-6.9175,107.6191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Buka Google Maps
                </a>
              </div>

              {/* Peta interaktif sungguhan */}
              <div className="mt-4 h-[400px] overflow-hidden rounded-xl border border-slate-100">
                <MapWrapper />
              </div>

              {/* Statistik */}
              <div className="mt-5 grid grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl ${item.box} px-4 py-3`}
                  >
                    <p className={`text-2xl font-bold ${item.text}`}>
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-700">
                Foto laporan warga
              </p>
            </div>

            {/* Kolom kanan: form laporan (versi terang) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Form Laporan Warga
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Laporkan masalah air
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Upload foto, pilih kategori, dan gunakan lokasi otomatis.
              </p>

              {/* Kotak upload */}
              <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  Upload foto bukti
                </p>
                <p className="text-xs text-slate-400">PNG/JPG maksimal 5MB</p>
              </div>

              {/* Input kategori */}
              <div className="mt-4">
                <label className="text-sm font-medium text-slate-700">
                  Kategori Masalah
                </label>
                <input
                  type="text"
                  placeholder="Misal: Pipa bocor"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                />
              </div>

              {/* Input deskripsi */}
              <div className="mt-3">
                <label className="text-sm font-medium text-slate-700">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  placeholder="Jelaskan kondisi masalahnya"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                />
              </div>

              {/* Lokasi otomatis */}
              <div className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-xs text-slate-500">Lokasi Otomatis</p>
                <p className="text-sm font-medium text-slate-700">
                  -6.917464, 107.619123
                </p>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-sky-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </section>

        {/* Kartu daftar laporan */}
        <section className="mx-auto mt-10 max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {reports.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-32 items-start p-4 ${item.cover} text-sm font-medium text-white`}
                >
                  Foto laporan user
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-500">{item.id}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Klik card untuk melihat pin lokasi dan membuka koordinat di
                    Google Maps.
                  </p>
                  <span
                    className={`mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${item.badgeStyle}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}