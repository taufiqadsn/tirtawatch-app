"use client";

import dynamic from "next/dynamic";

// Import peta secara dinamis di dalam Client Component
const PublicMap = dynamic(() => import("./PublicMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-400 font-medium tracking-widest">
        MEMUAT PETA...
      </span>
    </div>
  ),
});

export default function MapWrapper() {
  return <PublicMap />;
}
