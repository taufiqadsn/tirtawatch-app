import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { CATEGORIES, formatDateId } from "@/lib/constants";

function getDefaultImage(index = 0) {
  const images = [
    "/foto-dummy-1.jpg",
    "/foto-dummy-2.jpg",
    "/foto-dummy-3.jpg",
  ];

  return images[index % images.length];
}

export function mapDbReport(row, index = 0) {
  const category = CATEGORIES[row.category_key];

  return {
    uuid: row.id,
    id: row.ticket_code,
    ticketCode: row.ticket_code,
    title: row.title,
    category: row.category_key,
    categoryLabel: category?.label || row.category_key,
    description: row.description || "-",
    location: row.location,
    lat: row.latitude,
    lng: row.longitude,
    coords: {
      lat: row.latitude,
      lng: row.longitude,
    },
    reporter: row.reporter_name || "Anonim",
    status: row.status || "baru",
    supportCount: row.support_count || 0,
    upvotes: row.support_count || 0,
    beforeImage: row.before_image_url || getDefaultImage(index),
    afterImage: row.after_image_url || null,
    internalNote: row.internal_note || "",
    technicianName: row.technician_name || "-",
    estimatedFinish: row.estimated_finish || "-",
    createdAt: new Date(row.created_at),
    resolvedAt: row.resolved_at ? new Date(row.resolved_at) : null,
    date: formatDateId(row.created_at),
    gradient: "from-sky-400 to-sky-700",
  };
}

export async function getReports(options = {}) {
  const { limit } = options;

  const supabase = createSupabaseServerClient();

  let query = supabase
    .from("Laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((row, index) => mapDbReport(row, index));
}

export async function getReportByTicket(ticketCode) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Laporan")
    .select("*")
    .eq("ticket_code", ticketCode)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return mapDbReport(data);
}

export async function getReportStats() {
  const reports = await getReports();

  return {
    total: reports.length,
    baru: reports.filter((item) => item.status === "baru").length,
    proses: reports.filter((item) => item.status === "proses").length,
    selesai: reports.filter((item) => item.status === "selesai").length,
  };
}

export async function getMapPoints() {
  const reports = await getReports();

  return reports.map((report) => ({
    id: report.id,
    lat: report.lat,
    lng: report.lng,
    status: report.status,
    title: report.title,
  }));
}

export async function getCategoryStats() {
  const reports = await getReports();

  const total = reports.length || 1;

  const keys = ["pipa_bocor", "air_berwarna", "saluran_mampet", "limbah_ilegal"];

  return keys.map((key) => {
    const count = reports.filter((report) => report.category === key).length;

    return {
      key,
      count,
      pct: Math.round((count / total) * 100),
    };
  });
}