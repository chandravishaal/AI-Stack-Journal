export default function Hero() {
  return (
    <section className="relative bg-gray-950 text-center py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-indigo-400">MyBlog</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Discover stories, tutorials, and insights about modern web
          development.
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
