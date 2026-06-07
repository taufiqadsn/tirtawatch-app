const stats = [
  { value: "1.284", label: "Laporan masalah" },
  { value: "892", label: "Sudah selesai" },
  { value: "72%", label: "tingkat resolusi" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-sky-800 to-cyan-900">
      {/*
        Kalau kamu sudah punya foto air, taruh di folder public/images/
        lalu hidupkan baris background di bawah ini supaya foto jadi latar hero.
        style={{ backgroundImage: "url('/images/hero-water.jpg')" }}
      */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
        {/* Kolom kiri: teks utama */}
        <div className="text-white">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Laporkan masalah air di sekitarmu dengan cepat.
          </h1>
          <p className="mt-5 max-w-md text-base text-slate-100/90">
            Foto masalah, izinkan lokasi, kirim laporan, lalu pantau status
            penanganannya secara transparan dari dashboard publik.
          </p>

          <button
            type="button"
            className="mt-8 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
          >
            Gabung Sekarang
          </button>

          {/* Statistik */}
          <div className="mt-10 flex gap-10">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="mt-1 text-sm text-slate-200/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom kanan: kartu peta */}
        <div className="rounded-2xl bg-white p-4 shadow-2xl">
          {/*
            Ini placeholder peta. Nanti kalau mau peta beneran, kamu bisa
            pasang library seperti Leaflet (react-leaflet) atau Google Maps
            di dalam div ini.
          */}
          <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Pin lokasi (titik warna) */}
            <span className="absolute left-1/4 top-1/3 h-4 w-4 rounded-full border-2 border-white bg-red-500 shadow" />
            <span className="absolute right-1/3 top-1/2 h-4 w-4 rounded-full border-2 border-white bg-orange-400 shadow" />
            <span className="absolute right-1/4 top-1/4 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow" />
            <span className="absolute bottom-6 left-1/2 h-4 w-4 rounded-full border-2 border-white bg-orange-400 shadow" />
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Lihat Peta Laporan
          </button>
        </div>
      </div>
    </section>
  );
}
