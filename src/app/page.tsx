"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportMap from "@/components/ReportMap";
// import { mapPoints } from "@/lib/data";
import { IconChevron } from "@/components/Icons";
import React from "react";
import dynamic from "next/dynamic";

const LandingMap = dynamic(() => import("@/components/LandingMap"), {
  ssr: false,
});

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Depok,Jawa+Barat";

const problemCards = [
  {
    title: "Kerusakan Infrastruktur (Pipa & Meteran)",
    img: "/pipa-bocor.jpg",
    desc: "Pipa saluran utama bocor hingga menggenangi jalan raya? Atau meteran air di fasilitas umum rusak? Laporkan segera agar tim teknisi bisa mencegah pemborosan air bersih dan kerusakan jalan.",
  },
  {
    title: "Penurunan Kualitas Air",
    img: "/air-kotor.jpg",
    desc: "Hak Anda adalah mendapatkan air yang layak. Laporkan jika air yang mengalir ke rumah atau lingkungan Anda mendadak keruh, berwarna kuning/cokelat, berbau tajam, atau terindikasi tercemar.",
  },
  {
    title: "Gangguan Distribusi & Air Mati",
    img: "/keran-mati.jpg",
    desc: "Air mati total berhari-hari tanpa pemberitahuan resmi? Atau debit air mendadak mengecil drastis? Laporkan titik lokasinya agar petugas bisa melacak pusat penyumbatan atau gangguan pompanya.",
  },
];

const steps = [
  {
    n: "1",
    title: "Ambil Foto Kerusakan",
    desc: "Jepret bukti permasalahan air seperti pipa bocor hingga masalah air bersih.",
  },
  {
    n: "2",
    title: "Pin Lokasi Otomatis",
    desc: "Sistem mengunci koordinat GPS kamu, tambahkan deskripsi singkat kepada teknisi.",
  },
  {
    n: "3",
    title: "Laporan Terkirim",
    desc: "Sekali klik kirim, laporanmu langsung terhubung ke instansi terkait dan muncul di peta laporan publik.",
  },
  {
    n: "4",
    title: "Pantau Hingga Tuntas",
    desc: "Pantau progres laporan kamu dari dashboard. Dapatkan pembaruan terkait progres masalah.",
  },
];

const testimonials = [
  {
    name: "Budi Suryano",
    img: "/budi-suryano.jpg",
    text: "Awalnya saya coba-coba, tapi ternyata cepat banget penanganannya. Pipa bocor di depan gang langsung ditangani kurang dari 24 jam setelah lapor. Salut buat transparansinya.",
  },
  {
    name: "Dimas Pramudya",
    img: "/dimas-pramudya.jpg",
    text: "Fitur upvote ngebantu banget! Kemarin pipa utama di daerah Margonda pecah, banyak warga yang langsung dukung laporannya, jadi cepat masuk prioritas perbaikan.",
  },
  {
    name: "Nisa Ahmad",
    img: "/nisa-ahmad.jpg",
    text: "Aplikasinya familiar banget dipakai. Tinggal jepret foto, titik GPS otomatis kunci lokasi, kelar deh. Nggak ribet ngisi form panjang-panjang.",
  },
  {
    name: "Ratna Sarumpaet",
    img: "/ratna-sarumpaet.jpg",
    text: "Suka banget bisa mantau status laporan dari HP. Jadi tahu kalau teknisi udah jalan ke lokasi. Nggak kerasa digantungin kayak sistem pelaporan zaman dulu.",
  },
];

const faqs = [
  {
    q: "Apa yang Harus Saya Laporkan?",
    a: "Laporkan masalah air bersih seperti pipa bocor, air keruh, air berbau, meteran rusak, debit air mengecil, atau air mati di lingkungan sekitar.",
  },
  {
    q: "Berapa Lama Laporan Saya akan Diproses?",
    a: "Laporan akan langsung masuk ke sistem setelah dikirim. Waktu proses bergantung pada tingkat urgensi, lokasi, dan antrean penanganan dari pihak terkait.",
  },
  {
    q: "Bagaimana Cara Mengetahui Status Laporan Saya?",
    a: "Status laporan bisa dipantau melalui halaman Peta Laporan atau dashboard laporan. Setiap laporan memiliki status seperti baru, ditangani, dan selesai.",
  },
  {
    q: "Apakah Data Lokasi Saya Aman?",
    a: "Lokasi digunakan untuk membantu petugas menemukan titik masalah. Data ditampilkan seperlunya agar laporan bisa diproses secara transparan.",
  },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else setCount(start);
        }, 16);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

function PublicMapCard() {
  return (
    <div className="w-full rounded-[28px] bg-sky-50 p-4 shadow-card sm:p-6">
      <div className="relative overflow-hidden rounded-[22px] bg-sky-100">
        <LandingMap
          // points={mapPoints}
          className="h-[240px] sm:h-[320px] lg:h-[350px]"
        />
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka peta TirtaWatch di Google Maps"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition hover:bg-black/20 hover:opacity-100"
        >
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft">
            Buka di Google Maps
          </span>
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft"></div>

        <Link
          href="/peta"
          className="inline-flex h-[50px] items-center justify-center rounded-2xl bg-sky-500 px-7 text-sm font-semibold text-white shadow-soft transition hover:bg-sky-600"
        >
          Lihat Peta Laporan
        </Link>
      </div>
    </div>
  );
}

function ProblemCards() {
  return (
    <section className="relative z-10 -mt-14 px-5 lg:px-8">
      <style>{`
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-hidden { opacity: 0; transform: translateY(60px); }
        .card-visible { animation: floatUp 0.6s ease forwards; }
      `}</style>

      <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
        {problemCards.map((card, i) => (
          <article
            key={card.title}
            className="card-hidden h-full overflow-hidden rounded-[22px] bg-[#D8E9F4] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: `${i * 0.15}s` }}
            ref={(el) => {
              if (!el) return;
              setTimeout(() => {
                const obs = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      el.classList.remove("card-hidden");
                      el.classList.add("card-visible");
                      obs.disconnect();
                    }
                  },
                  { threshold: 0.15 },
                );
                obs.observe(el);
              }, 100);
            }}
          >
            <div className="relative h-[260px] overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-6 pb-8 pt-5">
              <h3 className="text-[26px] font-semibold leading-[1.05] text-ink">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-[17px] text-ink-mute">
                {card.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="cara-kerja" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl lg:leading-[50px]">
          Cara Kerja TirtaWatch
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.n}
              className="min-h-[150px] rounded-[20px] border border-line bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A9B9C9] text-[26px] font-bold leading-none text-sky-50 shadow-sm">
                  {step.n}
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-[23px] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[17px] text-ink-mute">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UserIcon({ img, name }) {
  return (
    <div className="flex h-[86px] w-[86px] shrink-0 overflow-hidden rounded-full border border-black sm:h-[102px] sm:w-[102px]">
      <img src={img} alt={name} className="h-full w-full object-cover" />
    </div>
  );
}

function Testimonials() {
  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl lg:leading-[50px]">
          Testimoni
        </h2>

        <div className="mt-9 grid gap-8 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex min-h-[285px] flex-col gap-6 rounded-[22px] bg-white p-7 shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:flex-row sm:gap-8 sm:p-8"
            >
              <UserIcon img={item.img} name={item.name} />

              <div className="sm:pt-5">
                <h3 className="text-2xl font-bold leading-tight text-ink sm:text-[30px] sm:leading-[41px]">
                  {item.name}
                </h3>
                <p className="mt-5 text-base leading-7 text-ink-mute sm:text-lg sm:leading-[26px]">
                  “{item.text}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <section id="faq" className="px-5 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl lg:leading-[50px]">
          FAQ
        </h2>

        <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-[66px]">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[22px] bg-sky-100 shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full min-h-[82px] cursor-pointer items-center justify-between gap-6 px-6 py-4 text-xl font-bold leading-tight text-ink sm:min-h-[99px] sm:px-9 lg:text-4xl lg:leading-[50px]"
                >
                  <span className="text-left">{item.q}</span>
                  <IconChevron
                    className={`h-8 w-8 shrink-0 text-ink transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-8 text-base leading-7 text-ink-mute sm:px-9 sm:text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-ink">
        {/* HERO */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage: "url('/foto-bg-dashboard.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[-80px] top-[-80px] h-80 w-80 rounded-full bg-sky-400 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-sky-600 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[721px] max-w-7xl items-start gap-10 px-5 py-16 lg:grid-cols-[1fr_557px] lg:px-8 lg:py-20 lg:items-center">
            <div>
              <h1 className="max-w-[650px] text-[40px] font-bold leading-none text-sky-50 drop-shadow-md sm:text-[50px]">
                Laporkan masalah air di sekitarmu dengan cepat.
              </h1>

              <p className="mt-8 max-w-[598px] text-lg font-bold leading-[26px] text-sky-50 drop-shadow-md sm:text-xl">
                Foto masalah, izinkan lokasi, kirim laporan, lalu pantau status
                penanganannya secara transparan dari dashboard publik.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-flex h-[51px] w-[275px] items-center justify-center rounded-2xl bg-[#224B5F] text-xl font-semibold text-white shadow-md transition hover:brightness-110"
              >
                Gabung Sekarang
              </Link>

              <div className="mt-12 flex flex-wrap gap-10 text-sky-50 lg:gap-12">
                <div>
                  <div className="text-[50px] font-bold ...">
                    <AnimatedCounter target={1284} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Laporan masalah
                  </p>
                </div>

                <div>
                  <div className="text-[50px] font-bold ...">
                    <AnimatedCounter target={892} />
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    Sudah selesai
                  </p>
                </div>

                <div>
                  <div className="text-[50px] font-bold ...">
                    <AnimatedCounter target={72} />%
                  </div>
                  <p className="mt-3 text-lg font-bold leading-[26px]">
                    tingkat resolusi
                  </p>
                </div>
              </div>
            </div>

            <PublicMapCard />
          </div>
        </section>

        <ProblemCards />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
