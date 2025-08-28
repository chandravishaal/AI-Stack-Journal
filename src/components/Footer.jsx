export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
}
