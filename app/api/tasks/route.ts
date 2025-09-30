import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import Notification from "@/models/Notification";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const query: Record<string, unknown> = {};

    if (searchParams.get("status")) query.status = searchParams.get("status");
    if (searchParams.get("priority")) query.priority = searchParams.get("priority");
    if (searchParams.get("projectId")) query.projectId = searchParams.get("projectId"); // ✅ filter tasks by project
    if (searchParams.get("search")) {
      query.title = { $regex: searchParams.get("search"), $options: "i" };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, priority, userId, projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "ProjectId is required" }, { status: 400 });
    }

    const newTask = await Task.create({
      title,
      priority,
      userId,
      projectId, // ✅ save projectId inside task
      status: "pending",
    });

    // ✅ Create notification
    if (userId) {
      await Notification.create({
        userId,
        message: `New task added: ${title}`,
      });
    }

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
