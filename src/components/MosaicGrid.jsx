import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import CustomButton from "./CustomButton";

// A reusable component for a single blog tile (can be main or small)
const BlogTile = memo(({ post, isMain = false }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackImage = isMain
    ? "https://placehold.co/1200x800/222222/FFF?text=Featured+Post"
    : "https://placehold.co/600x400/222222/FFF?text=AI+Stack+Journal";

  const handleImageError = () => {
    setImageError(true);
  };

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (isMain) {
    return (
      <motion.div
        className="rounded-2xl overflow-hidden shadow-md group relative h-fit"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Link to={`/blog/${post.slug}`} className="block">
          <div
            className={`h-80 md:h-[500px] flex items-end p-8 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundImage: `url(${
                  imageError ? fallbackImage : post.imageUrl
                })`,
              }}
              onError={handleImageError}
            />
            <div className="relative z-10 text-white">
              {post.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.slice(0, 2).map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="text-3xl font-extrabold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="opacity-90 max-w-xl mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs opacity-75 mb-4">
                {/* {post.readTime && <span>{post.readTime}</span>} */}
                {formattedDate && <span>{formattedDate}</span>}
              </div>
              <CustomButton className="mt-2 bg-white/10 border-white/20 hover:bg-white/20">
                Read Article
              </CustomButton>
            </div>
          </div>
        </Link>
        
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        viewport={{ once: true }}
      >
        <Link to={`/blog/${post.slug}`} className="block">
          {post.imageUrl && (
            <img
              src={imageError ? fallbackImage : post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          )}
          <div className="p-4">
            {post.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories.slice(0, 2).map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
              {/* {post.readTime && <span>{post.readTime}</span>} */}
              {formattedDate && <span> {formattedDate}</span>}
            </div>
            <CustomButton size="sm" className="w-full justify-center mt-4">
              Read Article
            </CustomButton>
          </div>
        </Link>
      </motion.div>
    );
  }
});

/**
 * MosaicGrid - A dynamic component that displays a featured post in a large tile and
 * other recent posts in smaller tiles, all fetched from the API.
 */
export default function MosaicGrid({
  limit = 3,
  featuredIndex = 0,
  category = null,
  tags = [],
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/blogs", { signal });
        if (response.data && Array.isArray(response.data)) {
          const validPosts = response.data
            .filter((post) => post.slug)
            .filter(
              (post) =>
                (!category || post.categories?.includes(category)) &&
                (tags.length === 0 ||
                  tags.every((tag) => post.tags?.includes(tag)))
            )
            .slice(0, limit);
          setItems(validPosts);
        } else {
          setError("Invalid response from the server. Please check the API.");
          console.error("API response was not a valid array:", response.data);
        }
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          // Request was aborted, do nothing
          console.log('Request aborted:', err);
          return;
        }
        console.error("Error fetching mosaic grid items:", err);
        // Provide a user-friendly error message
        setError("Failed to load featured posts. The server may be down.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();

    return () => {
      // Cancel the request if the component unmounts
      controller.abort();
    };
  }, [limit, category, JSON.stringify(tags)]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-center text-gray-600 dark:text-gray-400">
          {error || "No posts available."}
        </p>
      </section>
    );
  }

  const mainTile = items[featuredIndex];
  const smallTiles = items.filter((_, index) => index !== featuredIndex);

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:grid-rows-[auto] lg:items-start">
        {mainTile && (
          <div className="lg:col-span-2 lg:row-span-1">
            <BlogTile post={mainTile} isMain={true} />
          </div>
        )}
        <div className="lg:col-span-1 lg:row-span-1 space-y-6">
          {smallTiles.map((tile) => (
            <BlogTile key={tile.slug} post={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}