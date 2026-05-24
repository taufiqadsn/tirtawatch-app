import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        latitude: true,
        longitude: true,
        status: true,
        description: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
      take: 100,
    });

    return NextResponse.json({ data: reports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ message: "Gagal mengambil data peta" }, { status: 500 });
  }
}