"use client";

import { useState, useActionState, startTransition } from "react";
import Link from "next/link";
import { REPORT_CATEGORIES } from "@/lib/constants";
import { createLaporan, getPresignedUrl } from "@/app/actions/laporanActions";
import SubmitReportButton from "@/components/SubmitReportButton";
import { IconCamera, IconClock, IconPin, IconCheck } from "./Icons";

const initialState = {
  success: false,
  message: "",
  ticketCode: "",
};

export default function MultiStepReportForm() {
  const [step, setStep] = useState(1);
  const [categoryKey, setCategoryKey] = useState(REPORT_CATEGORIES[0].value);
  const [state, formAction] = useActionState(createLaporan, initialState);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleCustomSubmit = async (formData: FormData) => {
    setIsUploading(true);

    try {
      const imageFile = formData.get("image");
      if (imageFile instanceof File && imageFile.size > 0) {
        // 1. Minta Presigned URL dari server action
        const { signedUrl, filePath } = await getPresignedUrl(imageFile.name);

        // 2. Upload file langsung dari Browser ke Supabase Storage
        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          body: imageFile,
          headers: {
            "Content-Type": imageFile.type,
          },
        });

        if (!uploadRes.ok) {
          throw new Error("Gagal mengunggah gambar ke server.");
        }

        // 3. Susun Public URL dari path yang dikembalikan
        // Ganti URL proyek di bawah ini dengan URL Supabase Anda
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/laporan-images/${filePath}`;

        // Masukkan URL gambar ke dalam formData untuk disimpan di database
        formData.set("before_image_url", publicUrl);
      }

      // 4. Lanjutkan menyimpan data teks ke database menggunakan Server Action utama
      startTransition(() => {
        (formAction as (payload: FormData) => void)(formData);
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message); // Atau tampilkan di state error message Anda
    } finally {
      setIsUploading(false);
    }
  };

  const max = 3;

  const next = () => {
    if (step < max) setStep(step + 1);
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectedCategory = REPORT_CATEGORIES.find(
    (item) => item.value === categoryKey,
  );

  if (state.success) {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-ok-bg grid place-items-center text-ok-text">
          <IconCheck className="w-10 h-10" />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-navy">
          Laporan Terkirim!
        </h2>

        <p className="mt-1 text-sm text-ink-mute">
          Simpan nomor tiketmu untuk memantau status.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-200 px-5 py-3">
          <span className="text-sm text-ink-mute">Nomor Tiket</span>
          <span className="text-lg font-extrabold text-sky-700 tracking-wider">
            {state.ticketCode}
          </span>
        </div>

        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href={`/laporan/${state.ticketCode}`}
            className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
          >
            Lihat Status
          </Link>

          <Link
            href="/peta"
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-semibold transition"
          >
            Ke Peta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={handleCustomSubmit}>
      <input type="hidden" name="category_key" value={categoryKey} />
      <input type="hidden" name="location" value="Jl. Anggrek Raya, Bandung" />
      <input type="hidden" name="latitude" value="-6.917464" />
      <input type="hidden" name="longitude" value="107.619123" />

      <div className="hero-water text-white px-7 py-6 rounded-t-4xl -mx-7 -mt-7 mb-7">
        <div className="text-xs font-bold uppercase tracking-wider text-sky-200">
          Buat Laporan Baru
        </div>

        <h1 className="mt-1 text-2xl font-extrabold">Laporkan Masalah Air</h1>

        <div className="mt-5 flex items-center gap-2">
          <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="h-0.5 flex-1 bg-white/30 rounded">
            <div
              className="h-full bg-sky-300 rounded transition-all"
              style={{ width: step > 1 ? "100%" : "0%" }}
            />
          </div>

          <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="h-0.5 flex-1 bg-white/30 rounded">
            <div
              className="h-full bg-sky-300 rounded transition-all"
              style={{ width: step > 2 ? "100%" : "0%" }}
            />
          </div>

          <div className={`step-dot ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <div className="mt-2 flex justify-between text-[11px] text-sky-100/90">
          <span>Foto</span>
          <span>Detail</span>
          <span>Konfirmasi</span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-bold text-navy text-lg">1. Unggah Foto Bukti</h2>

          <p className="text-sm text-ink-mute mt-1">
            Untuk MVP tugas ini, foto masih memakai placeholder. Data utama yang
            disimpan adalah kategori, deskripsi, lokasi, dan status.
          </p>

          <label className="mt-5 block cursor-pointer">
            <div className="relative overflow-hidden min-h-[220px] rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50 hover:bg-sky-100 transition grid place-items-center text-center py-14 px-4">
              {imagePreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <IconCamera className="w-10 h-10 text-sky-500" />
                  <div className="mt-3 font-bold text-navy">
                    Ketuk untuk ambil / pilih foto
                  </div>
                  <div className="text-xs text-ink-mute mt-0.5">
                    PNG / JPG · maksimal 5 MB
                  </div>
                </>
              )}
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2.5 text-xs text-sky-700">
            <IconClock className="w-4 h-4" />
            Foto bisa dikembangkan lagi dengan Supabase Storage.
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-bold text-navy text-lg">2. Detail Laporan</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-[13px] font-bold text-navy">
                Nama Pelapor
              </label>

              <input
                name="reporter_name"
                type="text"
                placeholder="Boleh dikosongkan jika anonim"
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none"
              />
            </div>

            <div>
              <label className="text-[13px] font-bold text-navy">
                Kategori Masalah
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {REPORT_CATEGORIES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setCategoryKey(item.value)}
                    className={`cat-pick ${
                      categoryKey === item.value ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-bold text-navy">
                Deskripsi
              </label>

              <textarea
                name="description"
                rows={3}
                maxLength={200}
                placeholder="Ceritakan singkat kondisinya…"
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none resize-none"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 border border-line p-4">
              <div className="flex items-center gap-2 text-[13px] font-bold text-navy">
                <IconPin className="w-4 h-4 text-sky-500" />
                Koordinat GPS Otomatis
              </div>

              <div className="mt-1 text-xs text-ink-mute">
                -6.917464, 107.619123 · Jl. Anggrek Raya, Bandung
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-bold text-navy text-lg">
            3. Konfirmasi &amp; Kirim
          </h2>

          <div className="mt-5 rounded-2xl border border-line overflow-hidden">
            <div className="h-40 w-full bg-slate-100">
              {imagePreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imagePreview}
                  alt="Bukti Laporan"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Tampilkan gradient jika pengguna belum mengunggah gambar
                <div className="w-full h-full bg-gradient-to-br from-sky-400 to-sky-700" />
              )}
            </div>
          </div>

          <dl className="p-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-mute">Kategori</dt>
              <dd className="font-semibold text-navy">
                {selectedCategory?.label}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-ink-mute">Lokasi</dt>
              <dd className="font-semibold text-navy">
                Jl. Anggrek Raya, Bandung
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-ink-mute">Koordinat</dt>
              <dd className="font-semibold text-navy">-6.917464, 107.619123</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-ink-mute">Status Awal</dt>
              <dd className="font-semibold text-navy">Menunggu Konfirmasi</dd>
            </div>
          </dl>
        </div>
      )}

      {state.message && !state.success && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          className={`px-5 py-3 rounded-xl text-navy font-semibold hover:bg-slate-100 transition ${
            step === 1 ? "invisible" : ""
          }`}
        >
          Kembali
        </button>

        {step === max ? (
          <SubmitReportButton />
        ) : (
          <button
            type="button"
            onClick={next}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-glow transition ml-auto"
          >
            Lanjut
          </button>
        )}
      </div>
    </form>
  );
}
