import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceRole!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename } = body;

    if (!filename) {
      return NextResponse.json({ message: "Nama file diperlukan" }, { status: 400 });
    }

    const cleanFileName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniquePath = `reports/${Date.now()}-${cleanFileName}`;

    const { data, error } = await supabase.storage
    .from("tirtawatch-assets")
    .createSignedUploadUrl(uniquePath);

    if (error) {
      throw error;
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/tirtawatch-assets/${uniquePath}`;

    return NextResponse.json({
      message: "URL presigned berhasil dibuat",
      data: {
        signedUrl: data.signedUrl,
        path: uniquePath,
        publicUrl,
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ message: "Gagal membuat URL presigned" }, { status: 500 });
  }
}