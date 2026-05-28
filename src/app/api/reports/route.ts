import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      reporter_id,
      category_id,
      description,
      photo_url,
      latitude,
      longitude,
      address_name,
    } = body;

    const report = await prisma.report.create({
      data: {
        reporter_id,
        category_id,
        description,
        photo_url,
        latitude,
        longitude,
        address_name: address_name || "Lokasi tidak tersedia",
      },
    });

    await prisma.$executeRaw`UPDATE "Report" SET geom = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326) WHERE id = ${report.id}`;

    return NextResponse.json({ message: "Laporan berhasil dibuat", data: report }, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const radiusKm = parseFloat(searchParams.get("radius") || "5");

  try {
    const radiusInMeters = radiusKm * 1000;

    const nearbyReports = await prisma.$queryRaw` 
    SELECT id, category_id, description, photo_url, latitude, longitude, status, address_name
    FROM "Report"
    WHERE ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint(${lng}, ${lat})::geography, 4326), ${radiusInMeters})
    ORDER BY created_at DESC
    LIMIT 100;
    `;
    return NextResponse.json({ data: nearbyReports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching nearby reports:", error);
    return NextResponse.json({ message: "Gagal menarik data peta" }, { status: 500 });
  }
}