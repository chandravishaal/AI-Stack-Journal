import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-500">AI Stack Journal</h1>
        <div className="flex items-center space-x-6">
          <nav className="space-x-6 hidden md:flex">
            <a href="/" className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition">Home</a>
            <a href="/blog" className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition">Blog</a>
            <a href="/about" className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition">About</a>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5 text-gray-800" />
            ) : (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
