import BlogCard from "../components/BlogCard";
import blogPosts from "../data/blogPosts";

export default function BlogPage() {
  return (
    <div className="transition-colors duration-500">
      <section className="bg-gray-100 dark:bg-gray-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            All Blog Posts
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
