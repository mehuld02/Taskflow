import { NextResponse } from "next/server";

// 🔹 Mock database (replace with Prisma/Mongo/Postgres in real app)
let taskPrefs = {
  defaultDue: "today",
  showCompleted: true,
  autoArchive: false,
  defaultPriority: "medium",
};

// GET → return current task preferences
export async function GET() {
  return NextResponse.json(taskPrefs);
}

// PUT → update task preferences
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    taskPrefs = { ...taskPrefs, ...body }; // merge updates
    return NextResponse.json(taskPrefs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task preferences" },
      { status: 400 }
    );
  }
}
