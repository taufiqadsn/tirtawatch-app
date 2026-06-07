"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
// Pastikan Anda menyesuaikan path import Icon di bawah ini sesuai proyek Anda
import { IconUser, IconGoogle } from "@/components/Icons";

export default function LoginPage() {
  const router = useRouter();

  // 1. Setup State untuk Form dan Status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Email atau password salah");
      }

      setSuccessMsg("Berhasil masuk! Memuat dashboard...");

      // Sesi sudah tersimpan otomatis di HTTP-Only Cookie
      // Alihkan ke halaman utama setelah 1.5 detik
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Memaksa komponen layout/navbar membaca sesi terbaru
      }, 1500);
      
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
        <span className="bubble w-24 h-24 left-[10%] top-[16%] animate-floaty" />
        <span
          className="bubble w-12 h-12 right-[14%] bottom-[18%] animate-floaty"
          style={{ animationDelay: ".7s" }}
        />
        
        <div className="w-full max-w-md rounded-4xl bg-white/10 backdrop-blur-xl ring-1 ring-white/25 shadow-lift p-8 text-white relative">
          <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center shadow-soft text-sky-500">
            <IconUser className="w-[30px] h-[30px]" />
          </div>
          
          <h1 className="mt-4 text-2xl font-extrabold text-center">
            Masuk ke TirtaWatch
          </h1>
          <p className="text-center text-xs text-sky-100/80 mt-1 mb-6">
            Pantau dan kelola laporanmu
          </p>

          {/* Notifikasi Error */}
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
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                required
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white text-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                required
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl bg-white text-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-sky-500 w-4 h-4 cursor-pointer" /> 
                <span className="hover:text-sky-200 transition">Ingat saya</span>
              </label>
              <span className="font-semibold hover:underline cursor-pointer hover:text-sky-200 transition">
                Lupa password?
              </span>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`block text-center w-full rounded-xl font-bold py-3 transition ${
                loading 
                  ? "bg-sky-500/50 cursor-not-allowed text-sky-100" 
                  : "bg-sky-500 hover:bg-sky-600 active:scale-[0.98]"
              }`}
            >
              {loading ? "Memeriksa..." : "Masuk"}
            </button>
            
            <div className="flex items-center gap-3 text-xs text-sky-100/70 py-1">
              <span className="h-px flex-1 bg-white/30" />
              atau
              <span className="h-px flex-1 bg-white/30" />
            </div>
            
            {/* Tombol Google WAJIB pakai type="button" */}
            <button 
              type="button"
              className="w-full rounded-xl bg-[#0f172a]/80 hover:bg-[#0f172a] py-3 font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98] border border-white/10"
            >
              <IconGoogle className="w-5 h-5" /> Lanjut dengan Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-sky-100/90">
            Belum punya akun?{" "}
            <Link href="/register" className="font-bold underline hover:text-white transition">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}