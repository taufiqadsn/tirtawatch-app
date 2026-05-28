"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Status = "baru" | "proses" | "selesai";

type Laporan = {
  id: string;
  title: string;
  status: Status;
  lat: number;
  lng: number;
};

// Keterangan dan warna untuk tiap status
const statusInfo: Record<Status, { label: string; color: string }> = {
  baru: { label: "Belum diperbaiki", color: "#ef4444" },
  proses: { label: "Sedang ditangani", color: "#f59e0b" },
  selesai: { label: "Selesai", color: "#22c55e" },
};

// Data contoh. Nanti tinggal kamu ganti dengan data asli dari database.
const laporan: Laporan[] = [
  { id: "TW-00124", title: "Pipa distribusi bocor", status: "baru", lat: -6.9175, lng: 107.6191 },
  { id: "TW-00125", title: "Air keruh dan berbau", status: "proses", lat: -6.9015, lng: 107.6186 },
  { id: "TW-00126", title: "Saluran mampet dan meluap", status: "selesai", lat: -6.9268, lng: 107.6402 },
  { id: "TW-00127", title: "Meteran air rusak", status: "baru", lat: -6.9342, lng: 107.6055 },
  { id: "TW-00128", title: "Air mati total", status: "proses", lat: -6.8951, lng: 107.631 },
];

// Membuat pin bulat berwarna sesuai status (tanpa perlu file gambar)
function buildIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:20px;height:20px;border-radius:9999px;background:${color};border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
  });
}

export default function PublicMap() {
  return (
    <MapContainer
      center={[-6.9175, 107.6191]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {laporan.map((item) => {
        const info = statusInfo[item.status];
        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={buildIcon(info.color)}
          >
            <Popup>
              <div style={{ minWidth: "170px" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                  {item.id}
                </p>
                <p style={{ margin: "2px 0 8px", fontWeight: 700 }}>
                  {item.title}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "white",
                    background: info.color,
                  }}
                >
                  {info.label}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
