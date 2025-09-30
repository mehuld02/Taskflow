import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import NotificationPreference from "@/models/NotificationPreference";
import User from "@/models/User"; // assuming you have one

export async function GET() {
  await connectDB();

  // Get all users’ preferences
  const prefs = await NotificationPreference.find({});

  for (const pref of prefs) {
    // Skip users who disabled reminders
    if (!pref.taskReminders) continue;

    // Find pending tasks due today for this user
    const tasks = await Task.find({
      userId: pref.userId,
      status: "Pending",
      dueDate: { $lte: new Date() },
    });

    if (tasks.length > 0) {
      // Fetch user email
      const user = await User.findById(pref.userId);

      // Send email (example only, replace with Nodemailer/Resend/etc.)
      console.log(
        `📧 Sending reminder to ${user.email}: You have ${tasks.length} tasks due today.`
      );
    }
  }

  return NextResponse.json({ message: "Reminders processed" });
}
