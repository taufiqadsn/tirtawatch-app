const steps = [
  {
    number: "1",
    title: "Ambil Foto Kerusakan",
    description:
      "Jepret bukti permasalahan air seperti pipa bocor hingga masalah air bersih.",
  },
  {
    number: "2",
    title: "Pin Lokasi Otomatis",
    description:
      "Sistem mengunci koordinat GPS kamu, tambahkan deskripsi singkat kepada teknisi.",
  },
  {
    number: "3",
    title: "Laporan Terkirim",
    description:
      "Sekali klik kirim, laporanmu akan langsung terhubung ke instansi terkait dan muncul di peta laporan publik.",
  },
  {
    number: "4",
    title: "Pantau Hingga Tuntas",
    description:
      "Pantau progres laporan kamu dari dashboard-mu. Dapatkan notifikasi real-time terkait progress masalah.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Cara Kerja TirtaWatch
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
