// import { useParams } from "react-router-dom";
// import blogPosts from "../data/blogPosts";
// import CustomButton from "../components/CustomButton";
// import BlogCard from "../components/BlogCard";
// import { motion } from "framer-motion";

// export default function SingleBlogPage() {
//   const { id } = useParams();
//   const post = blogPosts.find((p) => p.id === parseInt(id));

//   if (!post) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-900 dark:text-white">
//         <h2 className="text-3xl font-bold">Post Not Found</h2>
//       </div>
//     );
//   }

//   // Related posts: overlapping categories/tags
//   const relatedPosts = blogPosts
//     .filter((p) => p.id !== post.id)
//     .filter((p) =>
//       p.categories.some((cat) => post.categories.includes(cat)) ||
//       p.tags.some((tag) => post.tags.includes(tag))
//     )
//     .slice(0, 3);

//   return (
//     <motion.div
//       className="transition-colors duration-500"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Banner */}
//       <div className="relative w-full h-80 md:h-[400px] overflow-hidden rounded-b-3xl shadow-lg">
//         <img
//           src={post.image}
//           alt={post.title}
//           className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-16">
//         {/* Title */}
//         <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//           {post.title}
//         </h1>

//         {/* Author & Date */}
//         <div className="flex items-center text-gray-500 dark:text-gray-400 mb-10 space-x-4 text-sm md:text-base">
//           <span>
//             By <span className="text-yellow-400">{post.author}</span>
//           </span>
//           <span>•</span>
//           <span>{post.date}</span>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           {post.categories.map((cat) => (
//             <CustomButton key={cat} className="text-sm px-4 py-1">{cat}</CustomButton>
//           ))}
//         </div>

//         {/* Content */}
//         <div
//           className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-12"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-12">
//           {post.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-yellow-400 text-sm px-3 py-1 rounded-full cursor-pointer 
//                          bg-yellow-400/10 hover:bg-yellow-400/20 transition-all duration-300"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Back Button */}
//         <div className="mb-16">
//           <CustomButton to="/blog">← Back to Blog</CustomButton>
//         </div>

//         {/* Related Posts */}
//         {relatedPosts.length > 0 && (
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//               Related Posts
//             </h2>
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {relatedPosts.map((p) => (
//                 <BlogCard key={p.id} post={p} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }



import { useParams, useNavigate } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import CustomButton from "../components/CustomButton";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";

export default function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-900 dark:text-white">
        <h2 className="text-3xl font-bold">Post Not Found</h2>
      </div>
    );
  }

  // Related posts: share at least one category or tag
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .filter(
      (p) =>
        p.categories.some((cat) => post.categories.includes(cat)) ||
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

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
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
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
            By <span className="text-yellow-400">{post.author}</span>
          </span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* Categories (display-only) */}
        <div className="flex flex-wrap gap-3 mb-6">
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-4 py-1 rounded-lg text-sm font-semibold
                         text-yellow-400 bg-yellow-400/10 dark:bg-yellow-400/6
                         border border-yellow-400/20 dark:border-yellow-400/10
                         cursor-default select-none"
              aria-hidden="true"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags (display-only) */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-yellow-400 text-sm px-3 py-1 rounded-full 
                         bg-yellow-400/10 dark:bg-yellow-400/6 cursor-default select-none"
            >
              {tag}
            </span>
          ))}
        </div>

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
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
