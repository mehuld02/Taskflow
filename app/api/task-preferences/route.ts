import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path
import connectDB from "@/lib/mongodb";
import TaskPreference from "@/models/TaskPreference";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  let pref = await TaskPreference.findOne({ userId });
  if (!pref) {
    pref = await TaskPreference.create({ userId });
  }

  return NextResponse.json(pref);
}

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();

  const pref = await TaskPreference.findOneAndUpdate(
    { userId },
    body,
    { new: true, upsert: true }
  );

  return NextResponse.json(pref);
}
