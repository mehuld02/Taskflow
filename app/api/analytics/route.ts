import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Project from "@/models/Project";

export async function GET() {
  try {
    await dbConnect();

    const tasks = await Task.find();
    const projects = await Project.find();

    const analytics = {
      tasks: {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "Completed").length,
        pending: tasks.filter((t) => t.status === "Pending").length,
      },
      projects: {
        total: projects.length,
        completed: projects.filter((p) => p.status === "Completed").length,
        inProgress: projects.filter((p) => p.status === "In Progress").length,
        pending: projects.filter((p) => p.status === "Pending").length,
      },
    };

    return NextResponse.json(analytics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
