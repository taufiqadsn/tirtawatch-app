"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

function createLandingIcon(L) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:20px;
        height:20px;
        border-radius:9999px;
        background:#0ea5e9;
        border:3px solid #ffffff;
        box-shadow:0 6px 16px rgba(15,23,42,.28);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

export default function LandingMap({ points = [], className = "" }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    const mapEl = mapRef.current;

    async function initMap() {
      if (typeof window === "undefined" || !mapEl) return;

      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapEl) return;

      // Aman untuk React Strict Mode / Fast Refresh.
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (mapEl._leaflet_id) {
        delete mapEl._leaflet_id;
      }

      const defaultCenter =
        points.length > 0 && points[0].position
          ? points[0].position
          : [-6.2297, 106.8261];

      const map = L.map(mapEl, {
        center: defaultCenter,
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      const icon = createLandingIcon(L);
      markersRef.current = points.map((point, index) => {
        const marker = L.marker(point.position || [0, 0], { icon }).addTo(map);

        if (point.title) {
          marker.bindPopup(`<strong>${point.title}</strong>`);
        }

        return marker;
      });
    }

    initMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (mapEl?._leaflet_id) {
        delete mapEl._leaflet_id;
      }
    };
  }, [points]);

  return <div ref={mapRef} className={`w-full h-full z-0 ${className}`} />;
}
