"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
// Pastikan Anda menyesuaikan path import Icon di bawah ini sesuai proyek Anda
import { IconUser, IconGoogle } from "@/components/Icons";

export default function RegisterPage() {
  const router = useRouter();

  // 1. Setup State untuk Form dan Status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 2. Fungsi Eksekusi ke Backend
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setErrorMsg("");
    setSuccessMsg("");

    // Validasi Checkbox
    if (!agreeTerms) {
      setErrorMsg("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

      setSuccessMsg("Pendaftaran berhasil! Mengalihkan...");

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error.message || "Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen grid place-items-center px-5 py-12"
        style={{
          backgroundImage: "url('/foto-bg-dashboard.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="bubble w-20 h-20 right-[12%] top-[18%] animate-floaty" />
        <span
          className="bubble w-10 h-10 left-[14%] bottom-[20%] animate-floaty"
          style={{ animationDelay: ".6s" }}
        />

        <div className="w-full max-w-md rounded-4xl bg-white/10 backdrop-blur-xl ring-1 ring-white/25 shadow-lift p-8 text-white">
          <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center shadow-soft text-sky-500">
            <IconUser className="w-[30px] h-[30px]" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-center">
            Buat Akun Baru
          </h1>
          <p className="text-center text-xs text-sky-100/80 mt-1 mb-6">
            Daftar untuk mulai menggunakan TirtaWatch
          </p>

          {/* Notifikasi Error (Desain Glassmorphism Transparan) */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-100 text-sm text-center backdrop-blur-sm">
              {errorMsg}
            </div>
          )}

          {/* Notifikasi Sukses */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-100 text-sm text-center backdrop-blur-sm">
              {successMsg}
            </div>
          )}

          {/* BUNGKUS DENGAN FORM UNTUK ONSUBMIT */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-sm font-semibold">Nama Lengkap</label>
              <input
                required
                type="text"
                placeholder="Nama kamu"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl bg-white text-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                required
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl bg-white text-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                required
                type="password"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl bg-white text-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <label className="flex items-start gap-2 text-xs pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="accent-sky-500 w-4 h-4 mt-0.5 cursor-pointer"
              />
              <span>
                Saya menyetujui{" "}
                <span className="underline hover:text-sky-200 transition">
                  Syarat &amp; Ketentuan
                </span>{" "}
                serta{" "}
                <span className="underline hover:text-sky-200 transition">
                  kebijakan privasi
                </span>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`block text-center w-full rounded-xl font-bold py-3 transition ${
                loading
                  ? "bg-sky-500/50 cursor-not-allowed text-sky-100"
                  : "bg-sky-500 hover:bg-sky-600 active:scale-[0.98]"
              }`}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>

            <div className="flex items-center gap-3 text-xs text-sky-100/70 py-1">
              <span className="h-px flex-1 bg-white/30" />
              atau
              <span className="h-px flex-1 bg-white/30" />
            </div>

            {/* Tombol Google OAuth (Jika Nanti Diperlukan) */}
            <button
              type="button"
              className="w-full rounded-xl bg-[#0f172a]/80 hover:bg-[#0f172a] py-3 font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98] border border-white/10"
            >
              <IconGoogle className="w-5 h-5" /> Lanjut dengan Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-sky-100/90">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-bold underline hover:text-white transition"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
