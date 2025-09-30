"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setAnalytics(data);
    }
    fetchAnalytics();
  }, []);

  if (!analytics) return <p className="p-6">Loading analytics...</p>;

  // ✅ Format data for charts
  const taskBreakdown = [
    { name: "Completed", value: analytics.tasks.completed },
    { name: "Pending", value: analytics.tasks.pending },
  ];

  const projectComparison = [
    { project: "Completed", tasks: analytics.projects.completed },
    { project: "In Progress", tasks: analytics.projects.inProgress },
    { project: "Pending", tasks: analytics.projects.pending },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Analytics</h1>

      {/* Task Breakdown */}
      <Card className="p-6 shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Task Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={taskBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
            >
              {taskBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", color: "#fff", borderRadius: "8px" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Project Comparison */}
      <Card className="p-6 shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Projects Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />
            <XAxis dataKey="project" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", color: "#fff", borderRadius: "8px" }}
            />
            <Legend />
            <Bar dataKey="tasks" fill="#3b82f6" name="Projects" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
