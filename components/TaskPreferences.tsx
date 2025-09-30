"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";

type TaskPrefs = {
  defaultDue: "today" | "tomorrow" | "none";
  showCompleted: boolean;
  autoArchive: boolean;
  defaultPriority: "low" | "medium" | "high";
};

export default function TaskPreferences() {
  const [prefs, setPrefs] = useState<TaskPrefs>({
    defaultDue: "today",
    showCompleted: true,
    autoArchive: false,
    defaultPriority: "medium",
  });

  // Fetch existing task preferences
  useEffect(() => {
    fetch("/api/tasks/prefs")
      .then((res) => res.json())
      .then((data: TaskPrefs) => setPrefs(data))
      .catch((err) => console.error("Failed to load task preferences:", err));
  }, []);

  // Handle checkbox + select updates
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save preferences
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/tasks/prefs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      alert("Task preferences updated!");
    } catch (error) {
      console.error("Error saving task preferences:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Task Preferences</h2>

      {/* Default Due Date */}
      <div>
        <label className="block mb-1 font-medium">Default Due Date</label>
        <select
          name="defaultDue"
          value={prefs.defaultDue}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="none">No due date</option>
        </select>
      </div>

      {/* Default Priority */}
      <div>
        <label className="block mb-1 font-medium">Default Priority</label>
        <select
          name="defaultPriority"
          value={prefs.defaultPriority}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-white dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Show Completed */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="showCompleted"
          checked={prefs.showCompleted}
          onChange={handleChange}
          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
        />
        Show Completed Tasks
      </label>

      {/* Auto-archive */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="autoArchive"
          checked={prefs.autoArchive}
          onChange={handleChange}
          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
        />
        Auto-archive Completed Tasks
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Save
      </button>
    </form>
  );
}
