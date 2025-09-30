"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Theme & Appearance</h2>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="hidden"
        />
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 ${
            darkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
              darkMode ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </label>
    </div>
  );
}
