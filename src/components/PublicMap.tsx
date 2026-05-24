"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Interface untuk data laporan
interface MapReport {
  id: string;
  latitude: number;
  longitude: number;
  status: string;
  description: string;
  created_at: string;
}

// 1. Fungsi pembuat pin/ikon individu (Merah = Baru, Hijau = Selesai)
const createIcon = (status: string) => {
  const isResolved = status === "RESOLVED";
  const bgColor = isResolved ? "#10B981" : "#EF4444"; // Emerald-500 & Red-500
  const pulseClass = isResolved ? "" : "animate-pulse";

  return L.divIcon({
    html: `<div class="w-5 h-5 rounded-full border-2 border-white shadow-md ${pulseClass}" style="background-color: ${bgColor};"></div>`,
    className: "custom-leaflet-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// 2. KUNCI CLUSTERING: Fungsi untuk membuat desain ikon gabungan (Cluster)
const createClusterCustomIcon = (cluster: any) => {
  // Dapatkan jumlah total pin di dalam cluster ini
  const count = cluster.getChildCount();

  // Ukuran lingkaran dinamis berdasarkan jumlah laporan
  let size = "w-10 h-10"; // Default (puluhan laporan)
  if (count > 50) size = "w-12 h-12"; // Lebih besar (ratusan laporan)

  return L.divIcon({
    // Menggunakan gaya Tirta Blue (#0E76A8) dengan Tailwind CSS
    html: `<div class="flex items-center justify-center ${size} rounded-full bg-[#0E76A8] border-[3px] border-white shadow-lg text-white font-bold text-sm bg-opacity-90 backdrop-blur-sm transition-all duration-300 hover:scale-110">
            ${count}
          </div>`,
    className: "custom-cluster-icon bg-transparent", // Mencegah background putih bawaan leaflet
    iconSize: L.point(40, 40, true),
  });
};

export default function PublicMap() {
  const [reports, setReports] = useState<MapReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Pusatkan peta di wilayah default (Misal: Jakarta)
  const defaultCenter: [number, number] = [-6.2, 106.816666];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports/public");
        const json = await response.json();
        if (json.data) {
          setReports(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat pin peta", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
        Memuat data infrastruktur...
      </div>
    );

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* BUNGKUS DENGAN MARKER CLUSTER GROUP */}
      <MarkerClusterGroup
        chunkedLoading // Memuat data dalam potongan kecil agar browser tidak freeze
        iconCreateFunction={createClusterCustomIcon} // Terapkan desain custom cluster
        maxClusterRadius={60} // Radius tarikan pengelompokan pin (dalam piksel layar)
        spiderfyOnMaxZoom={true} // Jika dizoom penuh tapi pin masih bertumpuk, akan mekar seperti jaring laba-laba
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createIcon(report.status)}
          >
            <Popup className="rounded-xl">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 text-[10px] font-bold text-white rounded-md ${report.status === "RESOLVED" ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {report.status === "RESOLVED"
                      ? "SELESAI"
                      : "PERLU TINDAKAN"}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(report.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-3 leading-snug font-medium">
                  &quot;{report.description}&quot;
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
