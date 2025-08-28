export default function Header() {
  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-400">MyBlog</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-indigo-400 transition">Home</a>
          <a href="/blog" className="hover:text-indigo-400 transition">Blog</a>
          <a href="/about" className="hover:text-indigo-400 transition">About</a>
        </nav>
      </div>
    </header>
  );
}
