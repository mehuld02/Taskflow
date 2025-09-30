import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import NotificationPreference from "@/models/NotificationPreference";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let prefs = await NotificationPreference.findOne({ userId: session.user.id });
  if (!prefs) {
    prefs = await NotificationPreference.create({ userId: session.user.id });
  }

  return NextResponse.json(prefs);
}

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  const prefs = await NotificationPreference.findOneAndUpdate(
    { userId: session.user.id },
    body,
    { new: true, upsert: true }
  );

  return NextResponse.json(prefs);
}
