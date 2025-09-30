"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/projects", label: "Projects", icon: <FolderKanban size={18} /> },
    { href: "/tasks", label: "Tasks", icon: <ListTodo size={18} /> },
    { href: "/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        TaskFlow
      </h1>

      {/* Navigation links */}
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
