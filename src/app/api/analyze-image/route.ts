import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { isValid: false, message: "Gambar tidak ditemukan." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY belum dipasang di .env.local");
      return NextResponse.json(
        { isValid: false, message: "Konfigurasi server AI belum lengkap." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt =
      "Is there a problem with water infrastructure, leaking pipes, flood, clogged drains, or trash in this image? Answer ONLY with YES or NO.";

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text().trim().toUpperCase();

    console.log("RESPONS GOOGLE GEMINI:", responseText);

    if (responseText.includes("YES")) {
      return NextResponse.json({ isValid: true });
    } else {
      return NextResponse.json(
        {
          isValid: false,
          message:
            "Foto ditolak. AI tidak mendeteksi adanya kerusakan infrastruktur air atau genangan pada foto tersebut.",
        },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error("Kesalahan Sistem Gemini:", error);
    return NextResponse.json(
      {
        isValid: false,
        message:
          "Terjadi gangguan saat menghubungi server Google AI. Pastikan koneksi internet stabil.",
      },
      { status: 500 },
    );
  }
}
