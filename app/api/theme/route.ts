import { NextResponse } from "next/server";

let theme = { mode: "light" };

export async function GET() {
  return NextResponse.json(theme);
}

export async function PUT(req) {
  const data = await req.json();
  theme = { ...theme, ...data };
  return NextResponse.json({ message: "Theme updated", theme });
}
