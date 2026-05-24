import MapWrapper from "@/components/MapWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                Tirta<span className="text-blue-600">Watch</span>
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/api/auth/signin"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Masuk Petugas
              </Link>
              <Link
                href="/report"
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Lapor Sekarang
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Pantau dan Rawat <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Infrastruktur Air Kita
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-8">
              Melihat pipa bocor atau aliran air mampet di sekitar Anda?
              Laporkan dalam hitungan detik. Bersama kita wujudkan distribusi
              air bersih yang responsif dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/report"
                className="px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Buat Laporan Baru
              </Link>
              <Link
                href="#cara-kerja"
                className="px-8 py-4 text-base font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                Cara Kerja
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* PETA PUBLIK SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Pantauan Infrastruktur Live
              </h2>
              <p className="text-gray-500">
                Lihat titik-titik laporan kerusakan dan perbaikan yang telah
                diselesaikan di sekitar Anda.
              </p>
            </div>
            <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">
                  Perlu Tindakan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
                <span className="text-sm text-gray-600 font-medium">
                  Sudah Diperbaiki
                </span>
              </div>
            </div>
          </div>

          {/* Container Peta */}
          <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
            <MapWrapper />
          </div>
        </div>
      </section>

      {/* Statistik Cepat */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/50">
            <div>
              <div className="text-3xl font-bold text-white mb-1">2.4k+</div>
              <div className="text-blue-200 text-sm">Laporan Selesai</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">15 Menit</div>
              <div className="text-blue-200 text-sm">Rata-rata Respon</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-blue-200 text-sm">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Tim Siaga</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bagaimana TirtaWatch Bekerja?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sistem pelaporan kami dirancang sesederhana mungkin agar setiap
              warga dapat berkontribusi tanpa kesulitan teknis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Ambil Foto
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Temukan kebocoran atau masalah air? Ambil foto langsung dari
                lokasi kejadian menggunakan smartphone Anda.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Lacak Otomatis
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sistem kami akan mendeteksi titik koordinat GPS Anda secara
                presisi agar teknisi tahu persis ke mana harus pergi.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Pantau Progres
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Dapatkan pembaruan langsung dari teknisi di lapangan hingga
                masalah benar-benar terselesaikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-white tracking-tight">
              Tirta<span className="text-blue-500">Watch</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TirtaWatch System. Dibangun untuk
            masyarakat.
          </p>
        </div>
      </footer>
    </div>
  );
}
