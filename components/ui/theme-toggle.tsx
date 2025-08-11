"use client";
import { useTheme } from "next-themes";
import React from "react";
import { FiSun } from "react-icons/fi";
import { RxMoon } from "react-icons/rx";
import clsx from "clsx";
import { useThemeTransition } from "./theme-handler";

export default function ThemeToggle() {
  const { theme } = useTheme();
  const { changeTheme, isAnimating } = useThemeTransition();

  return (
    <div className="flex items-center justify-start pb-2 pl-2">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex shadow-inner transition-colors duration-300">
        <button
          disabled={isAnimating}
          onClick={() => changeTheme("light")}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            theme === "light" ? "bg-white shadow text-black" : "text-gray-400"
          )}
        >
          <FiSun className="w-5 h-5" />
          <span className="font-medium">Light</span>
        </button>
        <button
          disabled={isAnimating}
          onClick={() => changeTheme("dark")}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            theme === "dark"
              ? "bg-white shadow text-black"
              : "text-gray-500 hover:text-black"
          )}
        >
          <RxMoon className="w-5 h-5" />
          <span className="font-medium">Dark</span>
        </button>
      </div>
    </div>
  );
}
