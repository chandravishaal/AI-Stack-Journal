// src/components/LatestPostsStrip.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

/**
 * LatestPostsStrip - shows latest N posts from mock data
 */
export default function LatestPostsStrip({ count = 4 }) {
  const posts = blogPosts.slice(0, count);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Insights</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((p, idx) => (
          <motion.article
            key={p.id}
            className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            viewport={{ once: true }}
          >
            <Link to={`/blog/${p.id}`} className="block h-full">
              <div className="h-40 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transform hover:scale-105 transition" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-yellow-400 transition">{p.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.excerpt}</p>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{p.date}</div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
