import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// GET user profile
export async function GET(req: Request) {
  try {
    await connectDB();
    // In a real app, you'd get userId from session
    const userId = "123"; // replace with session.user.id
    const user = await User.findById(userId).select("name email");
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch account info" }, { status: 500 });
  }
}

// PATCH update user profile
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const userId = "123"; // replace with session.user.id

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: body.name, email: body.email },
      { new: true }
    ).select("name email");

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update account info" }, { status: 500 });
  }
}
