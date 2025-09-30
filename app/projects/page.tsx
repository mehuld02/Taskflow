"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, Edit } from "lucide-react";

type Project = {
  _id: string;
  name: string;
  description: string;
  progress: number;
  status: "In Progress" | "Completed" | "Pending";
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState<Project | null>(null);

  // Fetch projects
  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add project
  const addProject = async () => {
    if (!newProject.name || !newProject.description) return;
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProject }),
    });
    setNewProject({ name: "", description: "" });
    fetchProjects();
  };

  // Delete project
  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  // Mark complete
  const markComplete = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed", progress: 100 }),
    });
    fetchProjects();
  };

  // Save edits
  const saveEdit = async () => {
    if (!editing) return;
    await fetch(`/api/projects/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchProjects();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-lg rounded-2xl hover:shadow-xl transition border border-gray-200 dark:border-gray-700">
              <CardContent className="p-5 space-y-3">
                {/* Title + Description */}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {project.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>

                {/* Created Date */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Added on: {new Date(project.createdAt).toLocaleDateString()}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium
                    ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {project.status}
                </span>

                {/* Progress */}
                <div className="mt-3">
                  <Progress value={project.progress} className="h-2 rounded-full" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.progress}% Complete
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1 mt-4">
                  <button
                    onClick={() => markComplete(project._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    <CheckCircle size={16} /> Complete
                  </button>
                  <button
                    onClick={() => setEditing(project)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Edit Project
            </h2>
            <input
              type="text"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              value={editing.progress}
              onChange={(e) =>
                setEditing({ ...editing, progress: Number(e.target.value) })
              }
              min="0"
              max="100"
              className="w-full px-3 py-2 border rounded-md"
            />
            <select
              value={editing.status}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  status: e.target.value as Project["status"],
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
