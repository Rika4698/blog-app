

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export async function POST(req) {
  const { name, email, password, image } = await req.json();
  await ConnectDB();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed, image });

  return NextResponse.json({ user }, { status: 201 });
}
