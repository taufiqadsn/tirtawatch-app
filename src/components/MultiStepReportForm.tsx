"use client";

import { useState, useActionState, startTransition, useEffect } from "react";
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

  const [reporterName, setReporterName] = useState("");
  const [description, setDescription] = useState("");

  const [state, formAction] = useActionState(createLaporan, initialState);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [spamError, setSpamError] = useState("");

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setSpamError("");
    }
  };

  const fetchLocation = () => {
    setIsLocating(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolokasi tidak didukung oleh browser/perangkat Anda.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          );
          const data = await res.json();
          const address = data.display_name || "Alamat detail tidak ditemukan";

          setLocationData({
            latitude: lat.toString(),
            longitude: lng.toString(),
            address: address,
          });
        } catch (error) {
          console.error("Gagal reverse geocoding:", error);
          setLocationData({
            latitude: lat.toString(),
            longitude: lng.toString(),
            address: "Gagal memuat nama jalan, namun koordinat tersimpan.",
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        setLocationError(
          "Gagal mengakses lokasi. Pastikan GPS aktif dan Anda memberikan izin lokasi pada browser.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  useEffect(() => {
    if (step === 2 && !locationData.latitude && !locationError) {
      fetchLocation();
    }
  }, [step, locationData.latitude, locationError]);

  const next = async () => {
    if (step === 1) {
      if (!imageFile) {
        setSpamError("Silakan unggah foto bukti terlebih dahulu.");
        return;
      }

      setIsAnalyzing(true);
      setSpamError("");

      try {
        const base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const MAX_WIDTH = 512;
              const scaleSize = MAX_WIDTH / img.width;

              canvas.width = MAX_WIDTH;
              canvas.height = img.height * scaleSize;

              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              }

              const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
              resolve(dataUrl.split(",")[1]);
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });

        const res = await fetch("/api/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64Image }),
        });

        const responseText = await res.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(
            "Server mengalami kendala internal. Coba sesaat lagi.",
          );
        }

        if (!res.ok || !data.isValid) {
          setSpamError(data.message || "Foto ditolak oleh AI.");
          setIsAnalyzing(false);
          return;
        }
      } catch (error: any) {
        console.error("AI Error Lengkap:", error);
        setSpamError(`Gagal: ${error.message}`);
        setIsAnalyzing(false);
        return;
      }

      setIsAnalyzing(false);
    }

    if (step < max) setStep(step + 1);
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const max = 3;

  const handleCustomSubmit = async (formData: FormData) => {
    if (!locationData.latitude) {
      alert(
        "Mohon tunggu hingga lokasi GPS Anda terdeteksi sebelum mengirim laporan.",
      );
      return;
    }

    setIsUploading(true);
    try {
      if (imageFile && imageFile.size > 0) {
        const { signedUrl, filePath } = await getPresignedUrl(imageFile.name);
        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          body: imageFile,
          headers: { "Content-Type": imageFile.type },
        });

        if (!uploadRes.ok)
          throw new Error("Gagal mengunggah gambar ke server.");

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/laporan-images/${filePath}`;
        formData.set("before_image_url", publicUrl);
      }

      startTransition(() => {
        (formAction as (payload: FormData) => void)(formData);
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally {
      setIsUploading(false);
    }
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
      <input type="hidden" name="reporter_name" value={reporterName} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="location" value={locationData.address} />
      <input type="hidden" name="latitude" value={locationData.latitude} />
      <input type="hidden" name="longitude" value={locationData.longitude} />

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
            Foto akan dianalisis oleh AI. Pastikan foto jelas dan relevan dengan
            kerusakan air.
          </p>
          <label className="mt-5 block cursor-pointer">
            <div
              className={`relative overflow-hidden min-h-[220px] rounded-3xl border-2 border-dashed ${spamError ? "border-red-400 bg-red-50" : "border-sky-200 bg-sky-50 hover:bg-sky-100"} transition grid place-items-center text-center py-14 px-4`}
            >
              {imagePreview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={`absolute inset-0 w-full h-full object-cover ${isAnalyzing ? "opacity-50 grayscale blur-sm" : ""} transition`}
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
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {spamError && (
            <div className="mt-3 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700 font-semibold shadow-sm border border-red-200">
              ⚠️ {spamError}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2.5 text-xs text-sky-700">
            <IconClock className="w-4 h-4" />
            Sistem dilengkapi AI Anti-Spam untuk menolak laporan palsu.
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
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
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
                    className={`cat-pick ${categoryKey === item.value ? "active" : ""}`}
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
                rows={3}
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan singkat kondisinya…"
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none resize-none"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 border border-line p-4">
              <div className="flex items-center justify-between gap-2 text-[13px] font-bold text-navy">
                <div className="flex items-center gap-2">
                  <IconPin className="w-4 h-4 text-sky-500" />
                  Koordinat GPS Otomatis
                </div>
                <button
                  type="button"
                  onClick={fetchLocation}
                  disabled={isLocating}
                  className="text-xs text-sky-500 hover:text-sky-700 underline font-semibold transition"
                >
                  {isLocating ? "Mencari..." : "Perbarui"}
                </button>
              </div>

              {locationError ? (
                <div className="mt-2 text-xs text-red-500 font-medium">
                  {locationError}
                </div>
              ) : (
                <div className="mt-2 text-xs text-ink-mute leading-relaxed">
                  {locationData.latitude && locationData.longitude ? (
                    <>
                      <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200">
                        {locationData.latitude}, {locationData.longitude}
                      </span>
                      <br />
                      <span className="inline-block mt-1">
                        {locationData.address}
                      </span>
                    </>
                  ) : isLocating ? (
                    <span className="animate-pulse">
                      Mendeteksi lokasi Anda saat ini...
                    </span>
                  ) : (
                    "Menunggu akses lokasi..."
                  )}
                </div>
              )}
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
                <div className="w-full h-full bg-gradient-to-br from-sky-400 to-sky-700" />
              )}
            </div>
          </div>
          <dl className="p-5 space-y-3 text-sm bg-white border border-t-0 border-line rounded-b-2xl">
            <div className="flex justify-between">
              <dt className="text-ink-mute">Kategori</dt>
              <dd className="font-semibold text-navy">
                {selectedCategory?.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-mute">Pelapor</dt>
              <dd className="font-semibold text-navy">
                {reporterName || "Anonim"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-mute whitespace-nowrap">Lokasi</dt>
              <dd className="font-semibold text-navy text-right line-clamp-2">
                {locationData.address || "Lokasi tidak diketahui"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-mute">Status Awal</dt>
              <dd className="font-semibold text-sky-600">
                Menunggu Verifikasi
              </dd>
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
          disabled={isAnalyzing || isUploading}
          className={`px-5 py-3 rounded-xl text-navy font-semibold hover:bg-slate-100 transition ${step === 1 ? "invisible" : ""}`}
        >
          Kembali
        </button>

        {step === max ? (
          <SubmitReportButton />
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={isAnalyzing || isUploading}
            className={`px-6 py-3 rounded-xl font-semibold shadow-glow transition ml-auto text-white ${
              isAnalyzing
                ? "bg-slate-400 cursor-wait shadow-none"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isAnalyzing ? "Menganalisis AI..." : "Lanjut"}
          </button>
        )}
      </div>
    </form>
  );
}
