import { useState, useEffect, useMemo } from 'react';
import BlogCard from '../components/BlogCard';
import CustomButton from '../components/CustomButton';
import api from '../api/axiosInstance';
import { motion } from 'framer-motion';

// Import the specific hero image
import BlogImage from '../assets/BlogImage.png';

// Refactored Hero component to accept an image prop
const BlogHero = ({ imageSrc }) => (
  <header className="relative w-full h-80 md:h-96 overflow-hidden">
    <img
      src={imageSrc}
      alt="Blog Header"
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => (e.target.style.display = 'none')} // Hide image on error
    />
    {/* Optional: Add a subtle overlay for better text readability */}
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
      <h1 className="text-5xl sm:text-5xl mb-32  md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-500 text-center drop-shadow-lg leading-tight">
        Explore AI Stack Journal
      </h1>
    </div>
  </header>
);

// Skeleton loader component for a better loading experience
const LoadingSkeleton = () => (
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-pulse h-[400px]">
        <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full mb-2 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 w-5/6 rounded"></div>
          <div className="mt-8 flex gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/blogs/');
        if (Array.isArray(response.data)) {
          setBlogPosts(response.data);
        } else {
          setBlogPosts([]);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs. Please try again later.');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const categoryMatch = !activeCategory || post.categories?.includes(activeCategory);
      const tagsMatch = activeTags.length === 0 || activeTags.every(tag => post.tags?.includes(tag));
      return categoryMatch && tagsMatch;
    });
  }, [blogPosts, activeCategory, activeTags]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = useMemo(
    () => filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE),
    [filteredPosts, startIndex]
  );

  const categories = useMemo(() => Array.from(new Set(blogPosts.flatMap(post => post.categories || []))), [blogPosts]);
  const tags = useMemo(() => Array.from(new Set(blogPosts.flatMap(post => post.tags || []))), [blogPosts]);

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    if (filterType === 'category') {
      setActiveCategory(value);
    } else if (filterType === 'tag') {
      setActiveTags(prev => (prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]));
    }
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-950 min-h-screen transition-colors duration-500">
      <BlogHero imageSrc={BlogImage} />

      {/* Filter Section - Placed higher for better view */}
      <div className="max-w-6xl   mx-auto px-6 py-8 md:py-12 -mt-48  relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filter by (categories and tags):</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <CustomButton
              className={`text-sm px-4 dark:text-black py-1 ${!activeCategory ? 'bg-yellow-400 text-gray-900' : ''}`}
              onClick={() => handleFilterChange('category', null)}
            >
              All Categories
            </CustomButton>
            {categories.map(cat => (
              <CustomButton
                key={cat}
                className={`text-sm px-4 py-1 ${activeCategory === cat ? 'bg-yellow-400 text-gray-900' : ''}`}
                onClick={() => handleFilterChange('category', cat)}
              >
                {cat}
              </CustomButton>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            {tags.map(tag => (
              <span
                key={tag}
                onClick={() => handleFilterChange('tag', tag)}
                className={`text-xs md:text-sm px-3 py-1 rounded-full cursor-pointer transition-all duration-300 ${activeTags.includes(tag) ? 'bg-yellow-400/20 text-yellow-400' : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}
              >
                #{tag}
              </span>
            ))}
            {activeTags.length > 0 && (
              <button
                onClick={() => {
                  setActiveTags([]);
                  setCurrentPage(1);
                }}
                className="text-xs px-2 py-1 rounded-lg font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Clear Tags
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSkeleton />
        ) : currentPosts.length > 0 ? (
          <>
            <motion.div
              className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-4 items-center">
                <CustomButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</CustomButton>
                <span className="text-gray-700 dark:text-gray-300 font-semibold text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <CustomButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</CustomButton>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg py-12">
            No posts match the selected filters.
          </p>
        )}
      </div>
    </section>
  );
}
