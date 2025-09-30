import { NextResponse } from "next/server";

// Mock user data
let user = { name: "Mehul Dubey", email: "mehul@example.com" };

export async function GET() {
  return NextResponse.json(user);
}

export async function PUT(req) {
  const data = await req.json();
  user = { ...user, ...data };
  return NextResponse.json({ message: "User updated", user });
}
