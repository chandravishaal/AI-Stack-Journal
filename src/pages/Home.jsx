import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import blogPosts from "../data/blogPosts";

export default function HomePage() {
  return (
    <div className="transition-colors duration-500">
      <Hero />

      {/* Featured Blogs Section - neutral background */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100 dark:bg-gray-950 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Featured Blogs
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
