"use client";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import AccountSettings from "@/components/AccountSettings";
import NotificationSettings from "@/components/NotificationSettings";
import TaskPreferences from "@/components/TaskPreferences";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-300 dark:border-gray-700">
        {["account", "theme", "notifications", "tasks"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "theme" && <ThemeToggle />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "tasks" && <TaskPreferences />}
      </div>
    </div>
  );
}
