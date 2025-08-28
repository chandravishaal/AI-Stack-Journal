// src/components/FeatureStrip.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import CustomButton from "./CustomButton";

/**
 * FeatureStrip - alternating image/text blocks
 * Each block links to the post's single page (/blog/:id)
 */
export default function FeatureStrip({ limit = 3 }) {
  const items = blogPosts.slice(0, limit);

  return (
    <div className="space-y-12">
      {items.map((item, i) => {
        const reversed = i % 2 === 1;
        return (
          <section key={item.id} className="max-w-7xl mx-auto px-6 py-12">
            <div
              className={`grid gap-8 items-center ${
                reversed
                  ? "md:grid-cols-2 md:grid-flow-col-dense"
                  : "md:grid-cols-2"
              }`}
            >
              {/* Image (clickable) */}
              <motion.div
                className={`${
                  reversed ? "md:col-start-2" : ""
                } rounded-2xl overflow-hidden shadow-lg`}
                initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link to={`/blog/${item.id}`} className="block w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 md:h-80 object-cover transform hover:scale-105 transition duration-500"
                  />
                </Link>
              </motion.div>

              {/* Text */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link to={`/blog/${item.id}`} className="block">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white hover:text-yellow-400 transition">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.excerpt}
                </p>
                <div>
                  <Link
                    to={`/blog/${item.id}`}
                    aria-label={`Read ${item.title}`}
                  >
                    <CustomButton size="sm" className=" justify-center">
                      Read article
                    </CustomButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
