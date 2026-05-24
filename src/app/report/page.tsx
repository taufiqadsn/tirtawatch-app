"use client";

import Image from "next/image";
import { useState } from "react";

const KATEGORI_LAPORAN = [
  { id: 1, label: "Pipa Bocor" },
  { id: 2, label: "Saluran Mampet" },
  { id: 3, label: "Air Berwarna / Berbau" },
  { id: 4, label: "Limbah Ilegal" },
  { id: 5, label: "Fasilitas Air Rusak" },
];

export default function TestReportPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    categoryId: KATEGORI_LAPORAN[0].id,
    description: "",
    photoUrl: "",
    latitude: "",
    longitude: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setFormData({ ...formData, photoUrl: file.name });

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, photoUrl: "" });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung fitur lokasi.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      () => {
        alert("Gagal mengambil lokasi. Pastikan izin lokasi (GPS) diaktifkan.");
      },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporter_id: "user-test-123",
          category_id: Number(formData.categoryId),
          description: formData.description,
          photo_url: formData.photoUrl || "https://via.placeholder.com/400",
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirim laporan");

      setSuccess(true);
      setFormData({
        categoryId: KATEGORI_LAPORAN[0].id,
        description: "",
        photoUrl: "",
        latitude: "",
        longitude: "",
      });
    } catch (error: any) {
      setErrorMsg(error.message || "Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#0E76A8] px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">Buat Laporan Baru</h2>
          <p className="text-[#0E76A8] text-sm text-blue-100 mt-1">
            Bantu kami memantau dan memperbaiki infrastruktur air di wilayah
            Anda.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Notifikasi */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✅ Laporan berhasil dikirim! Silakan cek peta untuk melihat pin
              baru.
            </div>
          )}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              ❌ {errorMsg}
            </div>
          )}

          {/* Kategori Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori Laporan <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: Number(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E76A8] focus:border-[#0E76A8] transition-colors bg-white outline-none"
            >
              {KATEGORI_LAPORAN.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.label}
                </option>
              ))}
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Detail <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan kondisi secara detail (misal: Air berbau menyengat sejak 2 hari yang lalu)..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E76A8] focus:border-[#0E76A8] transition-colors outline-none resize-none"
            />
          </div>

          {/* Upload Bukti Foto */}
          <div>
            <span className="block text-sm font-semibold text-gray-700 mb-2">
              Bukti Foto Kejadian
            </span>

            {/* JIKA TIDAK ADA GAMBAR: Tampilkan kotak Drag & Drop */}
            {!imagePreview ? (
              <label
                htmlFor="file-upload"
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#0E76A8] hover:bg-blue-50 transition-colors group cursor-pointer relative w-full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
              >
                <div className="space-y-1 text-center pointer-events-none">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#0E76A8] transition-colors"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex flex-col sm:flex-row text-sm text-gray-600 justify-center items-center gap-1">
                    <span className="font-medium text-[#0E76A8] group-hover:text-[#0b5e86]">
                      Unggah file foto
                    </span>
                    <span>atau tarik dan lepas</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF maksimal 5MB
                  </p>
                </div>
              </label>
            ) : (
              /* JIKA ADA GAMBAR: Tampilkan Preview & Tombol Hapus */
              <div className="mt-1 relative rounded-xl border border-gray-200 overflow-hidden shadow-sm group">
                <Image
                  width={500}
                  height={300}
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover bg-gray-100"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Hapus Foto
                  </button>
                </div>

                {/* Footer Nama File */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {formData.photoUrl}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Koordinat & Tombol Geolocation */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Lokasi Kejadian <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="text-xs font-bold text-[#0E76A8] bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
              >
                📍 Gunakan Lokasi Saat Ini
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E76A8] outline-none text-sm"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E76A8] outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-all 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0E76A8] hover:bg-[#0b5e86] hover:shadow-lg active:scale-[0.98]"
              }`}
          >
            {loading ? "Mengirim Laporan..." : "Kirim Laporan Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}
