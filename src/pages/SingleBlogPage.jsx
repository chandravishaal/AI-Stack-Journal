import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axiosInstance";
import CustomButton from "../components/CustomButton";
import BlogCard from "../components/BlogCard";
import { RiGeminiLine } from "react-icons/ri";

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

  // AI Summary State
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [errorSummary, setErrorSummary] = useState("");

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
        console.log(
          `Attempting to fetch single blog post with URL: /blogs/${slug}`
        );
        // Fetch the single post by slug from your backend
        const response = await api.get(`/blogs/${slug}`);

        // --- THIS IS THE FIX ---
        // Validate the response data to ensure it's a valid object before setting the state.
        // This handles cases where the API returns an empty object {} or an empty array []
        // instead of a 404.
        console.log("API response data:", response.data);
        if (response.data && Object.keys(response.data).length > 0) {
          setPost(response.data);
        } else {
          // If the data is empty or invalid, treat it as a not-found error.
          setError("The blog post you are looking for does not exist.");
        }
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Failed to load this blog post. It may not exist.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch all posts for the related section
    const fetchAllPosts = async () => {
      try {
        const response = await api.get("/blogs");
        setAllPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch all blogs for related section:", err);
      }
    };

    fetchPost();
    fetchAllPosts();
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length === 0) return [];

    return allPosts
      .filter((p) => p.slug !== post.slug)
      .filter(
        (p) =>
          p.categories?.some((cat) => post.categories?.includes(cat)) ||
          p.tags?.some((tag) => post.tags?.includes(tag))
      )
      .slice(0, 3);
  }, [post, allPosts]);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    setErrorSummary("");
    try {
      const res = await api.post("/ai/summarize", { content: post.content });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setErrorSummary("Failed to fetch summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">{error}</p>
        <CustomButton onClick={() => navigate("/blog")} className="mt-6">
          ← Back to Blog
        </CustomButton>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          The blog post you are looking for does not exist.
        </p>
        <CustomButton onClick={() => navigate("/blog")} className="mt-6">
          ← Back to Blog
        </CustomButton>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
          src={post.imageUrl || "/fallback-blog-image.png"}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          onError={(e) => {
            e.target.src = "/fallback-blog-image.png";
          }}
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
            By{" "}
            <span className="text-yellow-400 font-semibold">
              {post.author || "Admin"}
            </span>
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

       
        {/* AI Summary Section */}
        <div className="relative mt-6 p-6 border border-blue-400/40 dark:border-blue-500/30 mb-8 rounded-xl bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20 backdrop-blur-sm shadow-lg transition-all duration-300">
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse opacity-50"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <RiGeminiLine
                  className={`text-xl mr-3 transition-colors duration-300 ${
                    loadingSummary
                      ? "text-blue-500 animate-pulse"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  AI Summary
                </h3>
              </div>

              {summary && !loadingSummary && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Live
                  </span>
                </div>
              )}
            </div>

            {/* Loading state */}
            {loadingSummary && (
              <div className="py-6 text-center">
                <div className="flex justify-center space-x-1 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <p className="text-blue-700 dark:text-blue-300 font-medium mb-2">
                  Generating summary...
                </p>
                <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 h-1.5 rounded-full animate-pulse"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Almost there
                </p>
              </div>
            )}

            {/* Error state */}
            {errorSummary && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{errorSummary}</p>
              </div>
            )}

            {/* Generate button */}
            {!loadingSummary && !summary && (
              <div className="text-center">
                <CustomButton
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={fetchSummary}
                >
                  Generate Summary
                </CustomButton>
              </div>
            )}

            {/* Summary content */}
            {summary && !loadingSummary && (
              <div className="space-y-4">
                <div className="p-4 bg-white/60 dark:bg-gray-800/40 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: summary.replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-blue-200/30 dark:border-blue-700/30">
                  <span className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Generated just now
                  </span>

                  <CustomButton
                    className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300/50 dark:border-blue-600/50 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors duration-200"
                    onClick={() => setSummary("")}
                  >
                    Clear
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-16">
          <CustomButton onClick={() => navigate("/blog")}>
            ← Back to Blog
          </CustomButton>
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

// import { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../api/axiosInstance';
// import CustomButton from '../components/CustomButton';
// import BlogCard from '../components/BlogCard';

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center py-20 min-h-[400px]">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
//   </div>
// );

// export default function SingleBlogPage() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allPosts, setAllPosts] = useState([]);

//   // AI Summary State
//   const [summary, setSummary] = useState('');
//   const [loadingSummary, setLoadingSummary] = useState(false);
//   const [errorSummary, setErrorSummary] = useState('');

//   useEffect(() => {
//     if (!slug) {
//       setError("No blog slug provided in the URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchPost = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await api.get(`/blogs/${slug}`);
//         if (response.data && Object.keys(response.data).length > 0) {
//           setPost(response.data);
//         } else {
//           setError('The blog post you are looking for does not exist.');
//         }
//       } catch (err) {
//         console.error('Failed to fetch blog post:', err);
//         setError('Failed to load this blog post.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchAllPosts = async () => {
//       try {
//         const response = await api.get('/blogs');
//         setAllPosts(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error('Failed to fetch all blogs:', err);
//       }
//     };

//     fetchPost();
//     fetchAllPosts();
//   }, [slug]);

//   const relatedPosts = useMemo(() => {
//     if (!post || allPosts.length === 0) return [];
//     return allPosts
//       .filter(p => p.slug !== post.slug)
//       .filter(p =>
//         p.categories?.some(cat => post.categories?.includes(cat)) ||
//         p.tags?.some(tag => post.tags?.includes(tag))
//       )
//       .slice(0, 3);
//   }, [post, allPosts]);

//   const fetchSummary = async () => {
//     setLoadingSummary(true);
//     setErrorSummary('');
//     try {
//       const res = await api.post('/ai/summarize', { content: post.content });
//       setSummary(res.data.summary);
//     } catch (err) {
//       console.error(err);
//       setErrorSummary('Failed to fetch summary.');
//     } finally {
//       setLoadingSummary(false);
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-center">
//       <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
//       <p className="text-lg text-gray-700 mb-6">{error}</p>
//       <CustomButton onClick={() => navigate("/blog")}>← Back to Blog</CustomButton>
//     </div>
//   );

//   const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'long', day: 'numeric'
//   });

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
//       {/* Banner & Title Code Remains the Same */}

//       <div className="max-w-5xl mx-auto px-6 py-16">
//         {/* Blog content, categories, tags etc. remain the same */}

//         {/* AI Summary Section */}
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h3 className="text-lg font-semibold mb-2">AI Summary</h3>

//           {loadingSummary && <p>Generating summary...</p>}
//           {errorSummary && <p className="text-red-500">{errorSummary}</p>}

//           {!loadingSummary && !summary && (
//             <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={fetchSummary}>
//               Generate Summary
//             </button>
//           )}

//           {summary && (
//             <div className="mt-2 prose prose-sm">
//               <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>') }} />
//               <button className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded" onClick={() => setSummary('')}>
//                 Clear
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Related Posts & Back Button remain the same */}
//       </div>
//     </motion.div>
//   );
// }
