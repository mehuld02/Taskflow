"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationBell from "@/components/NotificationBell";

export function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; image?: string } | null>(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function handleLogout() {
  await fetch("/api/logout");
  localStorage.removeItem("user");
  setUser(null);
  router.push("/login");
}


  return (
    <header className="h-14 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Welcome message */}
      <div className="text-sm text-gray-500 dark:text-gray-300">
        Welcome back 👋 {user?.email ? user.email.split("@")[0] : ""}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notification Bell */}
        <NotificationBell />

        {/* User avatar + logout */}
        <Avatar>
  <AvatarImage src={user?.image || "/image.png"} alt="User profile" />
  <AvatarFallback>
    {user?.email ? user.email[0].toUpperCase() : "?"}
  </AvatarFallback>
</Avatar>

        <button
          onClick={handleLogout}
           className="px-4 py-1 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
