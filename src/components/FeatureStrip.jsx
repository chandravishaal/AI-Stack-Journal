import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import CustomButton from "./CustomButton";

// Reusable image component for clean JSX and better handling of image states
const FeatureImage = ({ imageUrl, title, category, reversed }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`${
        reversed ? "md:col-start-2" : ""
      } relative rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500`}
    >
      <img
        src={imageError ? "https://via.placeholder.com/600x400?text=AI+Stack+Journal" : imageUrl}
        alt={title}
        className="w-full h-60 md:h-80 object-cover"
        onError={() => setImageError(true)}
      />
      {/* Category Tag on Image */}
      {category && (
        <div className="absolute top-4 right-4 bg-yellow-400/90 text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {category}
        </div>
      )}
    </div>
  );
};

/**
 * FeatureStrip - A dynamic component that fetches and displays a limited number of blog posts in an alternating image/text layout.
 * Each block links to the post's single page using the post's unique slug.
 */
export default function FeatureStrip({ limit = 3 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Fetch a limited number of blog posts from the API
        const response = await api.get("/blogs");
        if (response.data && Array.isArray(response.data)) {
          // Filter to ensure each item has a slug for correct linking
          const validPosts = response.data.filter(post => post.slug);
          setItems(validPosts.slice(0, limit));
        } else {
          setError("Failed to fetch blog posts. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching feature strip items:", err);
        setError("Failed to load featured posts. The server may be down.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-white px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Error Loading Content</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {items.map((item, i) => {
        const reversed = i % 2 === 1;
        return (
          <motion.section
            key={item.slug}
            className="max-w-7xl mx-auto px-6 py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              to={`/blog/${item.slug}`}
              aria-label={`View post: ${item.title}`}
              className={`grid gap-8 items-center group ${
                reversed
                  ? "md:grid-cols-2 md:grid-flow-col-dense"
                  : "md:grid-cols-2"
              }`}
            >
              {/* Image with Category */}
              <FeatureImage
                imageUrl={item.imageUrl}
                title={item.title}
                category={item.categories?.[0]}
                reversed={reversed}
              />

              {/* Text */}
              <div
                className="space-y-4"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-yellow-400 transition">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.excerpt || (item.content && `${item.content.slice(0, 150)}...`) || "No excerpt available."}
                </p>
                <div>
                  <CustomButton size="sm" className="justify-center">
                    Read article
                  </CustomButton>
                </div>
              </div>
            </Link>
          </motion.section>
        );
      })}
    </div>
  );
}
