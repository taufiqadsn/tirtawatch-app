"use client";

import dynamic from "next/dynamic";

// Leaflet butuh objek window milik browser, jadi peta tidak boleh dirender
// di server. ssr: false memastikan peta hanya dimuat di sisi browser.
const PublicMap = dynamic(() => import("./PublicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
      Memuat peta...
    </div>
  ),
});

export default function MapWrapper() {
  return <PublicMap />;
}
