"use client";
// =====================================================================
// COMPONENT: ReportMap
// - Jika NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ADA  -> render Google Maps asli
//   (memuat script Maps JS API + marker berwarna sesuai status).
// - Jika TIDAK ADA -> render tampilan peta mock (CSS) supaya app tetap
//   jalan tanpa API key. Jadi kamu tinggal isi .env.local untuk go-live.
//
// Cara mengaktifkan Google Maps:
//   1) Buat API key di Google Cloud (aktifkan "Maps JavaScript API").
//   2) Salin .env.example -> .env.local, isi NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
//   3) Jalankan ulang `npm run dev`. Peta otomatis berubah jadi Google Maps.
// =====================================================================
import { useEffect, useRef, useState } from "react";

const STATUS_COLOR = { baru: "#EF4444", proses: "#F59E0B", selesai: "#22C55E" };

function loadGoogleMaps(apiKey) {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google && window.google.maps) return Promise.resolve(window.google);
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("gmaps-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.id = "gmaps-script";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(window.google);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function ReportMap({
  points = [],
  center = { lat: -6.917464, lng: 107.619123 },
  zoom = 13,
  className = "h-[420px]",
  clusterLabel,
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then((google) => {
        if (cancelled || !mapRef.current) return;
        const map = new google.maps.Map(mapRef.current, { center, zoom, mapId: "TIRTA_MAP" });
        points.forEach((p) => {
          const dot = document.createElement("div");
          dot.style.cssText = `width:18px;height:18px;border-radius:9999px;border:3px solid #fff;background:${STATUS_COLOR[p.status] || "#EF4444"};box-shadow:0 2px 6px rgba(0,0,0,.3)`;
          new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: p.lat, lng: p.lng },
            title: p.title || p.id,
            content: dot,
          });
        });
        setReady(true);
      })
      .catch(() => setReady(false));
    return () => { cancelled = true; };
  }, [apiKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Mode Google Maps asli ---
  if (apiKey) {
    return <div ref={mapRef} className={`rounded-3xl overflow-hidden bg-sky-100 ${className}`} />;
  }

  // --- Mode mock (default, tanpa API key) ---
  return (
    <div className={`map-mock rounded-3xl overflow-hidden ${className}`}>
      <div className="map-road h-2.5" style={{ left: "5%", right: "6%", top: "30%" }} />
      <div className="map-road h-2.5 -rotate-2" style={{ left: "10%", right: "12%", top: "62%" }} />
      <div className="map-road w-2.5" style={{ top: "8%", bottom: "10%", left: "40%" }} />
      <div className="map-road w-2.5 rotate-3" style={{ top: "14%", bottom: "20%", left: "72%" }} />
      {points.map((p, i) => (
        <span
          key={p.id || i}
          className="pin"
          title={p.title}
          style={{
            left: `${20 + ((i * 27) % 60)}%`,
            top: `${25 + ((i * 23) % 50)}%`,
            background: STATUS_COLOR[p.status] || "#EF4444",
            color: STATUS_COLOR[p.status] || "#EF4444",
          }}
        />
      ))}
      {clusterLabel && (
        <div className="absolute left-5 top-5 bg-white rounded-2xl px-4 py-3 shadow-lift max-w-[230px]">
          <div className="text-[10px] font-bold uppercase tracking-wide text-sky-700">● Mode pratinjau</div>
          <div className="text-sm font-bold text-navy mt-1">{clusterLabel}</div>
          <div className="text-xs text-ink-mute">Isi API key untuk peta sungguhan</div>
        </div>
      )}
    </div>
  );
}
