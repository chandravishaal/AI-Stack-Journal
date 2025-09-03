import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from 'react';

// Reusable SVG components for clean JSX
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// New sub-component for handling image logic
const BlogCardImage = ({ imageUrl, title, categories }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <figure className="relative h-48 md:h-56 w-full overflow-hidden">
      {/* Loading and Error Placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${!imageLoaded || imageError ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse"></div>
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Actual Image */}
      <img
        src={imageUrl || '/fallback-blog-image.png'}
        alt={title || 'Blog Post Image'}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />

      {/* Category tag */}
      {categories?.[0] && (
        <figcaption className="absolute top-4 right-4 bg-yellow-400/90 text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {categories[0]}
        </figcaption>
      )}
    </figure>
  );
};

export default function BlogCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No date';

  return (
    <motion.article
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 dark:border-gray-800 overflow-hidden"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* THIS IS THE FIX: The `to` prop now uses post.slug */}
      <Link to={`/blog/${post.slug}`} aria-label={`Read more about ${post.title || 'this blog post'}`} className="flex flex-col flex-1">
        <BlogCardImage imageUrl={post.imageUrl} title={post.title} categories={post.categories} />

        <div className="p-6 flex flex-col flex-1 gap-3">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
            {post.title || 'Untitled Post'}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {post.excerpt || (post.content && `${post.content.slice(0, 150)}...`) || 'No content available'}
          </p>
          
          <footer className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <UserIcon />
                {post.author || 'Anonymous'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon />
                {formattedDate}
              </span>
            </div>
          </footer>

        </div>
      </Link>
    </motion.article>
  );
}
