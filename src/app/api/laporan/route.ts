import { NextResponse } from "next/server";
// Sesuaikan path import ini dengan lokasi file Supabase client server Anda
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseServerClient();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = searchParams.get("limit");

    let query = supabase
      .from("Laporan")
      .select("*")
      .order("created_at", { ascending: false }); 

    if (userId) {
      query = query.eq("id", userId);
    }

    if (limit) {
      query = query.limit(Number(limit));
    }

    const { data: reports, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        reports: reports,
        message: "Data laporan berhasil diambil",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("API Laporan Error:", error);

    return NextResponse.json(
      {
        success: false,
        reports: [],
        message: error.message || "Gagal mengambil data dari server.",
      },
      { status: 500 },
    );
  }
}
