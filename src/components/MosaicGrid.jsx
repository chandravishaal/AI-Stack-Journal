// src/components/MosaicGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import blogPosts from "../data/blogPosts";

const MetaInfo = ({ readTime, publishDate, className = "" }) => (
  (readTime || publishDate) && (
    <div className={`flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      {readTime && <span>📖 {readTime}</span>}
      {publishDate && <span>📅 {publishDate}</span>}
    </div>
  )
);

const Categories = ({ categories, variant = "dark" }) => (
  categories?.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-2">
      {categories.slice(0, 2).map((cat, idx) => (
        <span
          key={idx}
          className={`text-xs px-2 py-1 rounded-full ${
            variant === "light" 
              ? "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400"
              : "bg-white/20 backdrop-blur-sm text-white"
          }`}
        >
          {cat}
        </span>
      ))}
    </div>
  )
);

const createTileData = (post) => ({
  title: post.title,
  excerpt: post.excerpt,
  buttonText: "Read Article",
  buttonLink: `/blog/${post.id}`,
  image: post.image,
  categories: post.categories,
  tags: post.tags,
  readTime: post.readTime,
  publishDate: post.publishDate
});

export default function MosaicGrid({ 
  limit = 4, 
  featuredIndex = 0,
  category = null,
  tags = [],
  customMainTile = null,
  customTiles = null
}) {
  
  // Filter and slice posts
  const posts = blogPosts
    .filter(post => 
      (!category || post.categories.includes(category)) &&
      (tags.length === 0 || tags.every(tag => post.tags.includes(tag)))
    )
    .slice(0, limit);
  
  // Create tiles data
  const mainTile = customMainTile || (posts[featuredIndex] && {
    ...createTileData(posts[featuredIndex]),
    gradient: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
  });
  
  const tiles = customTiles || posts
    .filter((_, index) => index !== featuredIndex)
    .map(createTileData);

  if (!mainTile && !tiles?.length) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-center text-gray-600 dark:text-gray-400">No posts available.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main tile */}
        {mainTile && (
          <motion.div
            className="lg:col-span-2 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-md group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to={mainTile.buttonLink} className="block">
              <div className={`h-72 md:h-96 flex items-end p-8 relative overflow-hidden ${mainTile.gradient}`}>
                {mainTile.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${mainTile.image})` }}
                  />
                )}
                <div className="text-white relative z-10">
                  <Categories categories={mainTile.categories} />
                  <h3 className="text-3xl font-extrabold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {mainTile.title}
                  </h3>
                  <p className="opacity-90 max-w-xl mb-4">{mainTile.excerpt}</p>
                  <MetaInfo readTime={mainTile.readTime} publishDate={mainTile.publishDate} className="opacity-75 mb-4" />
                  {mainTile.buttonText && (
                    <CustomButton className="mt-2 bg-white/10 border-white/20 hover:bg-white/20">
                      {mainTile.buttonText}
                    </CustomButton>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        )}
        
        {/* Small tiles */}
        <div className="space-y-6">
          {tiles.map((tile, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * idx }}
              viewport={{ once: true }}
            >
              <Link to={tile.buttonLink} className="block">
                {tile.image && (
                  <img 
                    src={tile.image} 
                    alt={tile.title} 
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                )}
                <div className="p-4">
                  <Categories categories={tile.categories} variant="light" />
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
                    {tile.title}
                  </h4>
                  {tile.excerpt && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {tile.excerpt}
                    </p>
                  )}
                  <MetaInfo readTime={tile.readTime} publishDate={tile.publishDate} className="mt-2" />
                  {tile.buttonText && (
                    <CustomButton size="sm" className="w-full justify-center mt-4">
                      {tile.buttonText}
                    </CustomButton>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}