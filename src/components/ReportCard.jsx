"use client";

import { useState } from "react";
import ImageComparisonSlider from "./ImageComparisonSlider";
import { CATEGORIES, getTimeLabel, getResolveDuration } from "@/lib/mockReports";

const STATUS_CONFIG = {
  baru: { label: "Laporan Baru", bg: "bg-blue-50", text: "text-blue-600" },
  proses: { label: "Dalam Proses", bg: "bg-amber-50", text: "text-amber-600" },
  selesai: { label: "Selesai", bg: "bg-emerald-50", text: "text-emerald-600" },
};

export default function ReportCard({ report }) {
  const [supported, setSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(report.supportCount);

  const category = CATEGORIES[report.category];
  const status = STATUS_CONFIG[report.status];
  const resolveDuration = getResolveDuration(report.createdAt, report.resolvedAt);
  const hasBeforeAfter = report.beforeImage && report.afterImage;

  const handleSupport = (e) => {
    e.stopPropagation();
    if (supported) {
      setSupportCount((c) => c - 1);
    } else {
      setSupportCount((c) => c + 1);
    }
    setSupported((s) => !s);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {hasBeforeAfter ? (
        <div className="h-44">
          <ImageComparisonSlider
            beforeImage={report.beforeImage}
            afterImage={report.afterImage}
          />
        </div>
      ) : (
        <div className="h-44 overflow-hidden">
          <img
            src={report.beforeImage}
            alt={report.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Belum Selesai
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: category?.color + "15",
              color: category?.color,
            }}
          >
            {category?.label}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
          {report.title}
        </h3>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {report.description}
        </p>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{report.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{report.reporter}</span>
          </div>
          {resolveDuration && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Waktu Tuntas: {resolveDuration}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSupport}
          className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg transition-all duration-150 ${
            supported
              ? "bg-blue-500 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill={supported ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Didukung oleh {supportCount} Warga
        </button>
      </div>
    </div>
  );
}
