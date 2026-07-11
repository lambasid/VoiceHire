"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) {
    return <div className="h-8 w-16" aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggle}
      className="relative inline-flex h-8 w-16 items-center rounded-full border transition-colors border-violet-200/70 bg-white/70 backdrop-blur-sm shadow-sm dark:border-slate-700 dark:bg-slate-800/70"
    >
      <Sun className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-amber-500 opacity-90 dark:opacity-40" />
      <Moon className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-400 opacity-60 dark:text-indigo-200 dark:opacity-100" />
      <span
        className={`absolute top-1 h-6 w-6 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
          isDark
            ? "translate-x-9 bg-gradient-to-br from-indigo-500 to-slate-800"
            : "translate-x-1 bg-gradient-to-br from-amber-300 to-rose-400"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-white" />
        )}
      </span>
    </button>
  );
}
