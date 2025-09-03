import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axiosInstance';
import CustomButton from '../components/CustomButton';
import BlogCard from '../components/BlogCard';

// A simple spinner component for the loading state
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20 min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

export default function SingleBlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch the single blog post
  useEffect(() => {
    // If there is no slug in the URL, we can't fetch anything.
    if (!slug) {
      setError("No blog slug provided in the URL.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Attempting to fetch single blog post with URL: /blogs/${slug}`);
        // Fetch the single post by slug from your backend
        const response = await api.get(`/blogs/${slug}`);
        
        // --- THIS IS THE FIX ---
        // Validate the response data to ensure it's a valid object before setting the state.
        // This handles cases where the API returns an empty object {} or an empty array []
        // instead of a 404.
        console.log('API response data:', response.data);
        if (response.data && Object.keys(response.data).length > 0) {
          setPost(response.data);
        } else {
          // If the data is empty or invalid, treat it as a not-found error.
          setError('The blog post you are looking for does not exist.');
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to load this blog post. It may not exist.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch all posts for the related section
    const fetchAllPosts = async () => {
      try {
        const response = await api.get('/blogs');
        setAllPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to fetch all blogs for related section:', err);
      }
    };
    
    fetchPost();
    fetchAllPosts();
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length === 0) return [];
    
    return allPosts
      .filter(p => p.slug !== post.slug)
      .filter(p =>
        p.categories?.some(cat => post.categories?.includes(cat)) ||
        p.tags?.some(tag => post.tags?.includes(tag))
      )
      .slice(0, 3);
  }, [post, allPosts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">{error}</p>
        <CustomButton onClick={() => navigate("/blog")} className="mt-6">← Back to Blog</CustomButton>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">The blog post you are looking for does not exist.</p>
        <CustomButton onClick={() => navigate("/blog")} className="mt-6">← Back to Blog</CustomButton>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Banner */}
      <div className="relative w-full h-80 md:h-[400px] overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src={post.imageUrl || '/fallback-blog-image.png'}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          onError={(e) => { e.target.src = '/fallback-blog-image.png'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-10 space-x-4 text-sm md:text-base">
          <span>
            By <span className="text-yellow-400 font-semibold">{post.author || 'Admin'}</span>
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Categories (display-only) */}
        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-4 py-1 rounded-lg text-sm font-semibold text-yellow-400 bg-yellow-400/10 dark:bg-yellow-400/6 border border-yellow-400/20 dark:border-yellow-400/10 cursor-default select-none"
                aria-hidden="true"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags (display-only) */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-yellow-400 text-sm px-3 py-1 rounded-full bg-yellow-400/10 dark:bg-yellow-400/6 cursor-default select-none"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mb-16">
          <CustomButton onClick={() => navigate("/blog")}>← Back to Blog</CustomButton>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Related Posts
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
