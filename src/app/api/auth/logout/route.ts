import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout berhasil" },
    { status: 200 },
  );

  // Menghapus session dengan menyetel umur cookie menjadi 0 detik
  response.cookies.set({
    name: "tirtawatch_session",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
