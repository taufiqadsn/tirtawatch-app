const testimonials = [
  {
    name: "Budi Suryano",
    quote:
      "Awalnya saya coba-coba, tapi ternyata cepat banget penanganannya. Pipa bocor di depan gang langsung ditangani kurang dari 24 jam setelah lapor. Salut buat transparansinya.",
  },
  {
    name: "Dimas Pramudya",
    quote:
      "Fitur upvote ngebantu banget! Kemarin pipa utama di daerah Margonda pecah, banyak warga yang langsung dukung laporannya, jadi cepat masuk prioritas perbaikan.",
  },
  {
    name: "Nisa Ahmad",
    quote:
      "Aplikasinya familiar banget dipake. Tinggal jepret foto, titik GPS otomatis ngunci lokasi, kelar deh. Nggak ribet ngisi form panjang-panjang.",
  },
  {
    name: "Ratna Sarumpaet",
    quote:
      "Suka banget bisa mantau status laporan dari HP. Jadi tahu kalau teknisi udah jalan ke lokasi. Nggak kerasa digantungin kayak sistem pelaporan zaman dulu.",
  },
];

function AvatarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-slate-800">Testimoni</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <AvatarIcon />
                </span>
                <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
