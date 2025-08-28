export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 transition-colors duration-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} AI Stack Journal. All rights reserved.
      </div>
    </footer>
  );
}
