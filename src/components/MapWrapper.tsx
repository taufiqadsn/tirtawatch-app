"use client";

import dynamic from "next/dynamic";

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
