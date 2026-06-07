export const CATEGORIES = {
  pipa_bocor: {
    label: "Pipa Bocor",
    color: "#EF4444",
    markerColor: "red",
  },
  saluran_mampet: {
    label: "Saluran Mampet",
    color: "#F59E0B",
    markerColor: "orange",
  },
  air_berwarna: {
    label: "Air Berwarna / Berbau",
    color: "#3B82F6",
    markerColor: "blue",
  },
  limbah_ilegal: {
    label: "Limbah Ilegal",
    color: "#10B981",
    markerColor: "green",
  },
};

export const mockReports = [
  {
    id: 1,
    title: "Pipa distribusi utama pecah",
    category: "pipa_bocor",
    description:
      "Katup pipa utama pecah akibat tekanan air berlebih. Sudah dilakukan penggantian dengan katup baru berstandar SNI dan jalan telah dibersihkan.",
    location: "Jl. Margonda Raya, Depok",
    lat: -6.3728,
    lng: 106.8294,
    reporter: "Sebastian Gunawan",
    status: "selesai",
    supportCount: 120,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 10),
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Saluran drainase tersumbat sampah",
    category: "saluran_mampet",
    description:
      "Saluran utama tersumbat oleh tumpukan sampah plastik dan lumpur. Air meluap ke jalan saat hujan deras.",
    location: "Jl. Raya Bogor, Ciracas",
    lat: -6.3621,
    lng: 106.8912,
    reporter: "Rina Wahyuni",
    status: "proses",
    supportCount: 87,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    resolvedAt: null,
    beforeImage:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    afterImage: null,
  },
  {
    id: 3,
    title: "Air PDAM berwarna kuning keruh",
    category: "air_berwarna",
    description:
      "Air yang keluar dari keran berwarna kuning keruh sejak 3 hari terakhir. Diduga ada kebocoran pipa tanah di sekitar area.",
    location: "Perum Griya Asri, Bekasi",
    lat: -6.2417,
    lng: 106.9924,
    reporter: "Hendra Kusuma",
    status: "baru",
    supportCount: 54,
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    resolvedAt: null,
    beforeImage:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    afterImage: null,
  },
  {
    id: 4,
    title: "Pembuangan limbah pabrik ke sungai",
    category: "limbah_ilegal",
    description:
      "Ditemukan pipa pembuangan limbah pabrik tekstil yang langsung mengalir ke Kali Ciliwung tanpa pengolahan. Air sungai berbusa dan berbau menyengat.",
    location: "Bantaran Kali Ciliwung, Cawang",
    lat: -6.2601,
    lng: 106.8689,
    reporter: "Dian Pratiwi",
    status: "selesai",
    supportCount: 203,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    beforeImage:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Kebocoran pipa bawah tanah",
    category: "pipa_bocor",
    description:
      "Tanah di trotoar terus basah dan berlubang akibat kebocoran pipa air bersih di bawah permukaan. Volume air terbuang sangat besar.",
    location: "Jl. Sudirman, Jakarta Pusat",
    lat: -6.2088,
    lng: 106.8126,
    reporter: "Agus Santoso",
    status: "selesai",
    supportCount: 178,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    beforeImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    afterImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Drainase tersumbat akar pohon",
    category: "saluran_mampet",
    description:
      "Akar pohon besar menembus pipa drainase dan menyebabkan penyumbatan total. Area sekitar sering banjir saat hujan.",
    location: "Jl. Gatot Subroto, Menteng",
    lat: -6.1944,
    lng: 106.8229,
    reporter: "Lestari Ningrum",
    status: "proses",
    supportCount: 62,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    resolvedAt: null,
    beforeImage:
      "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&h=300&fit=crop",
    afterImage: null,
  },
  {
    id: 7,
    title: "Air berbau seperti belerang",
    category: "air_berwarna",
    description:
      "Warga mengeluh air keran berbau seperti belerang atau telur busuk. Kemungkinan ada kontaminasi dari sumur bor di dekatnya.",
    location: "Jl. Pemuda, Rawamangun",
    lat: -6.1951,
    lng: 106.886,
    reporter: "Budi Hartono",
    status: "baru",
    supportCount: 41,
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    resolvedAt: null,
    beforeImage:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&h=300&fit=crop",
    afterImage: null,
  },
  {
    id: 8,
    title: "Pembuangan oli bekas ke selokan",
    category: "limbah_ilegal",
    description:
      "Bengkel di pinggir jalan membuang oli bekas langsung ke selokan. Lapisan minyak terlihat mengalir menuju sungai kecil di belakang perumahan.",
    location: "Jl. Otista, Jatinegara",
    lat: -6.2192,
    lng: 106.8738,
    reporter: "Maya Sari",
    status: "baru",
    supportCount: 29,
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
    resolvedAt: null,
    beforeImage:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    afterImage: null,
  },
];

export function getTimeLabel(date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
}

export function getResolveDuration(created, resolved) {
  if (!resolved) return null;
  const diff = resolved.getTime() - created.getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours === 0) return `${minutes} Menit`;
  return `${hours} Jam ${minutes} Menit`;
}
