import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua kolom wajib diisi" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        full_name: name,
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: "CITIZEN",
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil!", userId: newUser.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
