export default function Hero() {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-950 text-center py-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-indigo-500">AI Stack Journal</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Discover stories, tutorials, and insights about AI, web development, and modern technology.
        </p>
        <a
          href="/blog"
          className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition"
        >
          Explore Blog
        </a>
      </div>
    </section>
  );
}
