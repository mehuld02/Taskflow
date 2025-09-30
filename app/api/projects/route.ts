import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

// GET all projects
export async function GET() {
  await connectDB();
  const projects = await Project.find({});
  return NextResponse.json(projects);
}

// POST new project
export async function POST(req: Request) {
  await connectDB();
  const { name, description, progress, status } = await req.json();

  const project = await Project.create({
    name,
    description,
    progress: progress || 0,
    status: status || "Pending",
  });

  return NextResponse.json(project);
}
