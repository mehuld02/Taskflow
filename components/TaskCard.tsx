import React from "react";

interface TaskCardProps {
  id: string;
  title: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
  project?: string;
  onStatusChange: (id: string, newStatus: "Pending" | "Completed") => void;
}

export default function TaskCard({ id, title, status, priority, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-4 flex items-center justify-between  dark:bg-gray-700 dark:text-gray-100">
      {/* Left side (title + tags) */}
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex gap-2 mt-2">
          {/* Status Tag */}
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>

          {/* Priority Tag */}
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              priority === "High"
                ? "bg-red-100 text-red-500"
                : priority === "Medium"
                ? "bg-blue-100 text-blue-500"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {priority}
          </span>
        </div>
      </div>

      {/* Right side (Action button) */}
      <button
        onClick={() =>
          onStatusChange(id, status === "Completed" ? "Pending" : "Completed")
        }
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        {status === "Completed" ? "Mark Pending" : "Mark Done"}
      </button>
    </div>
  );
}
