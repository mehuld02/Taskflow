"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
  project?: string | { _id: string; name: string };
  updatedAt?: string;
};

type Project = { _id: string; name: string };

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentActivity, setRecentActivity] = useState<
    { action: string; title: string; time: string }[]
  >([]);

  // ✅ Fetch tasks & projects
  const fetchData = async () => {
    const [tasksRes, projectsRes] = await Promise.all([
      fetch("/api/tasks"),
      fetch("/api/projects"),
    ]);

    const tasksData: Task[] = await tasksRes.json();
    const projectsData: Project[] = await projectsRes.json();

    setTasks(tasksData);
    setProjects(projectsData);

    // Recent activity
    const activity = tasksData
      .slice(-5)
      .reverse()
      .map((t) => ({
        action: t.status === "Completed" ? "Task Completed" : "Task Added",
        title: t.title,
        time: t.updatedAt
          ? new Date(t.updatedAt).toLocaleDateString()
          : "recently",
      }));
    setRecentActivity(activity);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  // ✅ Stats
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.length - completed;

  // ✅ Line chart: Completed tasks per weekday
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const lineData = weekDays.map((day, i) => {
    const count = tasks.filter(
      (t) =>
        t.status === "Completed" &&
        t.updatedAt &&
        new Date(t.updatedAt).getDay() === i
    ).length;
    return { day, completed: count };
  });

  // ✅ Bar chart: Tasks grouped by project & status
  const barData: { project: string; Completed: number; Pending: number }[] =
    projects.map((project) => {
      const projectTasks = tasks.filter((t) => {
        const projectId =
          typeof t.project === "string" ? t.project : t.project?._id;
        return projectId === project._id;
      });
      return {
        project: project.name,
        Completed: projectTasks.filter((t) => t.status === "Completed").length,
        Pending: projectTasks.filter((t) => t.status === "Pending").length,
      };
    });

  // ✅ Add unassigned tasks
  const unassignedTasks = tasks.filter((t) => !t.project);
  if (unassignedTasks.length > 0) {
    barData.push({
      project: "Unassigned",
      Completed: unassignedTasks.filter((t) => t.status === "Completed").length,
      Pending: unassignedTasks.filter((t) => t.status === "Pending").length,
    });
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-500 dark:text-gray-400">Total Tasks</p>
            <h2 className="text-2xl font-bold">{tasks.length}</h2>
          </CardContent>
        </Card>

        <Card className="shadow-md border dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-500 dark:text-gray-400">Completed</p>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completed}
            </h2>
          </CardContent>
        </Card>

        <Card className="shadow-md border dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-500 dark:text-gray-400">Pending</p>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
              {pending}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <Card className="p-6 shadow-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Tasks Completed This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" />
              <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="p-6 shadow-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Tasks by Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="project" stroke="#6b7280" />
                <YAxis stroke="#6b7280" allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="Completed"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  name="Completed"
                />
                <Bar
                  dataKey="Pending"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                  name="Pending"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 shadow-md border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recentActivity.map((activity, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b dark:border-gray-700 pb-2"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {activity.title}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
