"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { supabaseClient } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Tembak ke API backend yang sudah Anda buat
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Tangani jika login gagal (email/password salah)
      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Email atau password salah.",
        );
      }

      // 3. Validasi Role Admin dari response backend
      // Sesuaikan "data.user.role" dengan struktur JSON yang dikembalikan oleh login/route.ts Anda
      const userRole = data.user?.role || data.role;

      if (userRole !== "ADMIN" && userRole !== "PETUGAS") {
        // Jika yang login warga biasa, panggil API logout untuk menghapus cookie JWT yang telanjur dibuat
        await fetch("/api/auth/logout", { method: "POST" });
        throw new Error(
          "Akses Ditolak: Kredensial ini tidak memiliki izin sebagai Petugas/Admin.",
        );
      }

      // 4. Sukses! Alihkan ke Dashboard
      router.push("/admin");
      router.refresh(); // Memaksa layout membaca cookie terbaru
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hero-water hidden lg:flex flex-col justify-between p-12 text-white relative">
        <Logo size={34} wordColor="#fff" />
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight">
            Portal Instansi
            <br />
            &amp; Petugas Lapangan
          </h2>
          <p className="mt-4 text-sky-50/90 max-w-sm">
            Kelola laporan warga, atur prioritas berdasarkan lokasi dan upvote,
            lalu update status penanganan secara real-time.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            <div>
              <div className="text-3xl font-extrabold">128</div>
              <div className="text-xs text-sky-100/80">Laporan</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">24</div>
              <div className="text-xs text-sky-100/80">Menunggu</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">88</div>
              <div className="text-xs text-sky-100/80">Selesai</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-sky-100/70 relative">
          © 2026 TirtaWatch · Dashboard SaaS untuk PDAM &amp; Dinas Lingkungan
          Hidup
        </p>
      </div>

      <div className="grid place-items-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Logo size={30} />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
            AREA PETUGAS
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-navy">
            Masuk sebagai Petugas
          </h1>
          <p className="text-sm text-ink-mute mt-1 mb-6">
            Gunakan kredensial instansi yang terdaftar.
          </p>

          {/* Notifikasi Error */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-navy">
                Email Instansi
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="petugas@pdam.go.id"
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-navy">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-soft cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-sky-500 w-4 h-4 cursor-pointer"
                />
                Ingat perangkat
              </label>
              <span className="font-semibold text-sky-700 hover:underline cursor-pointer">
                Lupa password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="block text-center w-full rounded-xl bg-navy-deep hover:bg-navy text-white font-bold py-3 transition active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Memverifikasi..." : "Masuk Dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-mute">
            Warga ingin melapor?{" "}
            <Link
              href="/lapor"
              className="font-bold text-sky-700 hover:underline"
            >
              Buat laporan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
