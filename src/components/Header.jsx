import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="shadow-sm sticky top-0 z-50 transition-colors duration-300 backdrop-blur-sm 
                       bg-white/70 dark:bg-black/70 dark:from-black/70 dark:via-slate-950/40 dark:to-gray-900/90 dark:bg-gradient-to-r">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-yellow-400 drop-shadow-md">
            {" "}
            <Link
              to="/"
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              AI Stack Journal
            </Link>
          </h1>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="space-x-6 hidden md:flex">
              <Link
                to="/"
                className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="hover:text-indigo-500 text-gray-900 dark:text-gray-100 transition"
              >
                About
              </Link>
            </nav>
            {/* Theme Toggle Button */}
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
            {/* Sidebar Toggle Button (Mobile) */}
            <button 
              onClick={toggleSidebar} 
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-controls="sidebar"
              aria-expanded={isSidebarOpen}
            >
              <Bars3Icon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-950 transform transition-transform duration-300 ease-in-out shadow-xl
                   ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Menu</h2>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <XMarkIcon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/"
            onClick={toggleSidebar}
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            Home
          </Link>
          <Link
            to="/blog"
            onClick={toggleSidebar}
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            Blog
          </Link>
          <Link
            to="/about"
            onClick={toggleSidebar}
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            About
          </Link>
        </nav>
      </div>

      {/* Overlay to close sidebar when clicked outside */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
        ></div>
      )}
    </>
  );
}