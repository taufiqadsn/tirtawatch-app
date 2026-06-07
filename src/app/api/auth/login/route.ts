import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    // 1. Cari user berdasarkan email
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 },
      );
    }

    // 2. Verifikasi cocok/tidaknya password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 },
      );
    }

    // 3. Buat Payload JWT (Jangan masukkan data sensitif seperti password)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: user.id,
      name: user.full_name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d") // Token hangus dalam 1 hari
      .sign(secret);

    // 4. Set ke dalam HTTP-Only Cookie demi keamanan maksimal
    const response = NextResponse.json(
      {
        message: "Login berhasil",
        user: { id: user.id, name: user.full_name, role: user.role },
      },
      { status: 200 },
    );

    response.cookies.set({
      name: "tirtawatch_session",
      value: token,
      httpOnly: true, // Tidak bisa diintip oleh JavaScript (Aman dari XSS)
      secure: process.env.NODE_ENV === "production", // Wajib HTTPS di production
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 hari dalam satuan detik
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
