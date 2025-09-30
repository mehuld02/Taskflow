"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";

interface Task {
  _id: string;
  title: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
  project: string;
}

interface Project {
  _id: string;
  name: string;
}

interface TaskPrefs {
  defaultDue: "today" | "tomorrow" | "none";
  showCompleted: boolean;
  autoArchive: boolean;
  defaultPriority: "low" | "medium" | "high";
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedProject, setSelectedProject] = useState("");
  const [prefs, setPrefs] = useState<TaskPrefs | null>(null);

  // ✅ Fetch tasks, projects, and preferences
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch("/api/tasks/prefs")
      .then((res) => res.json())
      .then((data) => {
        setPrefs(data);
        setPriority(
          data.defaultPriority.charAt(0).toUpperCase() + data.defaultPriority.slice(1)
        );
      });
  }, []);

  // ✅ Add new task
  const addTask = async () => {
    if (!title.trim() || !selectedProject) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, project: selectedProject }),
    });

    const newTask = await res.json();
    setTasks([newTask, ...tasks]);
    setTitle("");
    setPriority(
      prefs
        ? prefs.defaultPriority.charAt(0).toUpperCase() + prefs.defaultPriority.slice(1)
        : "Medium"
    );
    setSelectedProject("");
  };

  // ✅ Update task status
  const updateTaskStatus = async (
    id: string,
    newStatus: "Pending" | "Completed"
  ) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  // ✅ Filter tasks based on preferences
  const filteredTasks = prefs?.showCompleted
    ? tasks
    : tasks.filter((t) => t.status !== "Completed");

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Tasks Dashboard</h1>

      {/* Add Task Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col md:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-3 py-2"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-3 py-2"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            id={task._id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            project={task.project}
            onStatusChange={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}
