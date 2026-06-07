"use client";

import { useEffect, useRef } from "react";

const CATEGORY_COLORS = {
  pipa_bocor: "#EF4444",
  saluran_mampet: "#F59E0B",
  air_berwarna: "#3B82F6",
  limbah_ilegal: "#10B981",
};

const CATEGORY_LABELS = {
  pipa_bocor: "Pipa Bocor",
  saluran_mampet: "Saluran Mampet",
  air_berwarna: "Air Berwarna",
  limbah_ilegal: "Limbah Ilegal",
};

const STATUS_LABELS = {
  baru: "Laporan Baru",
  proses: "Dalam Proses",
  selesai: "Selesai",
};

const STATUS_COLORS = {
  baru: "#3B82F6",
  proses: "#F59E0B",
  selesai: "#10B981",
};

function createCustomIcon(L, category, status) {
  const color = CATEGORY_COLORS[category] || "#888";
  const isResolved = status === "selesai";

  const svgMarker = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
      </filter>
      <path
        d="M14 2C8.477 2 4 6.477 4 12c0 7 10 22 10 22S24 19 24 12c0-5.523-4.477-10-10-10z"
        fill="${color}"
        filter="url(#shadow)"
        opacity="${isResolved ? 0.7 : 1}"
      />
      <circle cx="14" cy="12" r="5" fill="white" opacity="0.9"/>
      ${isResolved ? `<path d="M11 12l2 2 4-4" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : ""}
    </svg>
  `;

  return L.divIcon({
    html: svgMarker,
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

export default function LeafletMap({ reports = [], onMarkerClick }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let L;
    let map;

    async function initMap() {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (mapInstanceRef.current) return;

      map = L.map(mapRef.current, {
        center: [-6.2297, 106.8261],
        zoom: 12,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      reports.forEach((report) => {
        const icon = createCustomIcon(L, report.category, report.status);

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 200px; max-width: 240px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
              <span style="
                background:${CATEGORY_COLORS[report.category]}20;
                color:${CATEGORY_COLORS[report.category]};
                font-size:11px;
                font-weight:600;
                padding:2px 8px;
                border-radius:999px;
              ">${CATEGORY_LABELS[report.category]}</span>
              <span style="
                background:${STATUS_COLORS[report.status]}20;
                color:${STATUS_COLORS[report.status]};
                font-size:11px;
                font-weight:600;
                padding:2px 8px;
                border-radius:999px;
              ">${STATUS_LABELS[report.status]}</span>
            </div>
            <p style="font-weight:600; font-size:13px; margin:0 0 4px; color:#111;">${report.title}</p>
            <p style="font-size:12px; color:#666; margin:0 0 8px;">📍 ${report.location}</p>
            <p style="font-size:12px; color:#888; margin:0 0 8px;">👤 ${report.reporter}</p>
            <div style="display:flex; align-items:center; gap:4px; font-size:12px; color:#666;">
              <span>👍 ${report.supportCount} dukungan</span>
            </div>
          </div>
        `;

        const marker = L.marker([report.lat, report.lng], { icon })
          .bindPopup(popupContent, {
            closeButton: true,
            maxWidth: 260,
          })
          .addTo(map);

        if (onMarkerClick) {
          marker.on("click", () => onMarkerClick(report));
        }

        markersRef.current.push(marker);
      });
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === "undefined") return;

    async function updateMarkers() {
      const L = (await import("leaflet")).default;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const map = mapInstanceRef.current;

      reports.forEach((report) => {
        const icon = createCustomIcon(L, report.category, report.status);

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 200px; max-width: 240px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
              <span style="
                background:${CATEGORY_COLORS[report.category]}20;
                color:${CATEGORY_COLORS[report.category]};
                font-size:11px;
                font-weight:600;
                padding:2px 8px;
                border-radius:999px;
              ">${CATEGORY_LABELS[report.category]}</span>
              <span style="
                background:${STATUS_COLORS[report.status]}20;
                color:${STATUS_COLORS[report.status]};
                font-size:11px;
                font-weight:600;
                padding:2px 8px;
                border-radius:999px;
              ">${STATUS_LABELS[report.status]}</span>
            </div>
            <p style="font-weight:600; font-size:13px; margin:0 0 4px; color:#111;">${report.title}</p>
            <p style="font-size:12px; color:#666; margin:0 0 8px;">📍 ${report.location}</p>
            <p style="font-size:12px; color:#888; margin:0 0 8px;">👤 ${report.reporter}</p>
            <div style="display:flex; align-items:center; gap:4px; font-size:12px; color:#666;">
              <span>👍 ${report.supportCount} dukungan</span>
            </div>
          </div>
        `;

        const marker = L.marker([report.lat, report.lng], { icon })
          .bindPopup(popupContent, { closeButton: true, maxWidth: 260 })
          .addTo(map);

        if (onMarkerClick) {
          marker.on("click", () => onMarkerClick(report));
        }

        markersRef.current.push(marker);
      });
    }

    updateMarkers();
  }, [reports]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden z-0">
      <div ref={mapRef} className="w-full h-full" />

      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Kategori
        </p>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 mb-1 last:mb-0">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[key] }}
            />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
