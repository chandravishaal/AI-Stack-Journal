import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                        dark:from-gray-950 dark:via-gray-900 dark:to-gray-850 text-center py-28 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6"
        >
          Welcome to <span className="text-yellow-400">AI Stack Journal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg text-gray-100 mb-10"
        >
          Discover stories, tutorials, and insights about AI, web development, and modern technology.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          href="/blog"
          className="inline-block px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-yellow-300 transition"
        >
          Explore Blog
        </motion.a>
      </div>
    </section>
  );
}
