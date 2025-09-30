"use client";

import { useEffect, useState } from "react";

interface NotificationPrefs {
  emailNotifications: boolean;
  pushNotifications: boolean;
  taskReminders: boolean;
  weeklySummary: boolean;
}

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklySummary: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch preferences
  useEffect(() => {
    fetch("/api/notificationPreferences")
      .then((res) => res.json())
      .then((data) => {
        setPrefs(data);
        setLoading(false);
      });
  }, []);

  // Save preferences
  const handleSave = async () => {
    await fetch("/api/notificationPreferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prefs),
    });
    alert("✅ Preferences saved!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={prefs.emailNotifications}
          onChange={(e) =>
            setPrefs({ ...prefs, emailNotifications: e.target.checked })
          }
        />
        Email Notifications
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={prefs.pushNotifications}
          onChange={(e) =>
            setPrefs({ ...prefs, pushNotifications: e.target.checked })
          }
        />
        Push Notifications
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={prefs.taskReminders}
          onChange={(e) =>
            setPrefs({ ...prefs, taskReminders: e.target.checked })
          }
        />
        Task Reminders
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={prefs.weeklySummary}
          onChange={(e) =>
            setPrefs({ ...prefs, weeklySummary: e.target.checked })
          }
        />
        Weekly Summary Emails
      </label>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Save Preferences
      </button>
    </div>
  );
}
