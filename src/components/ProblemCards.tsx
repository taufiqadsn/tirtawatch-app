const problems = [
  {
    image: "/images/masalah-1.jpg",
    title: "Kerusakan Infrastruktur (Pipa & Meteran)",
    description:
      "Pipa saluran utama bocor hingga menggenangi jalan raya? Atau meteran air di fasilitas umum rusak? Laporkan segera agar tim teknisi bisa mencegah pemborosan air bersih dan kerusakan jalan.",
  },
  {
    image: "/images/masalah-2.jpg",
    title: "Penurunan Kualitas Air",
    description:
      "Hak Anda adalah mendapatkan air yang layak. Laporkan jika air yang mengalir ke rumah atau lingkungan Anda mendadak keruh, berwarna kuning atau cokelat, berbau tajam, atau terindikasi tercemar.",
  },
  {
    image: "/images/masalah-3.jpg",
    title: "Gangguan Distribusi & Air Mati",
    description:
      "Air mati total berhari-hari tanpa pemberitahuan resmi? Atau debit air mendadak mengecil drastis? Laporkan titik lokasinya agar petugas bisa melacak pusat penyumbatan atau gangguan pompanya.",
  },
];

export default function ProblemCards() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {problems.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-2xl bg-blue-50 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Ganti src dengan foto kamu di folder public/images/ */}
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full bg-slate-200 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
