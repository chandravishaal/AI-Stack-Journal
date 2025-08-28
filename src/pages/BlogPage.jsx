import { useState } from "react";
import BlogCard from "../components/BlogCard";
import blogPosts from "../data/blogPosts";
import CustomButton from "../components/CustomButton";
import BlogImage from "../assets/BlogImage.png";

// Pagination
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTags, setActiveTags] = useState([]); // multi-tag selection

  const handleTagClick = (tag) => {
    setCurrentPage(1);
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag)); // deselect if already selected
    } else {
      setActiveTags([...activeTags, tag]); // add to selection
    }
  };

  // Filter posts by active category and active tags
  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory && !post.categories.includes(activeCategory))
      return false;
    if (activeTags.length > 0) {
      return activeTags.every((tag) => post.tags.includes(tag));
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // Extract unique categories and tags dynamically
  const categories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories))
  );
  const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  return (
    <section className="bg-gray-100 dark:bg-gray-950 pt-0 pb-24 transition-colors duration-500">
      <div className="relative">
        <img
          src={BlogImage}
          alt="Blog Header"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-7xl font-black text-yellow-400 mb-0 text-center px-4 drop-shadow-xl">
            Explore AI Stack Journal
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <CustomButton
            className={`text-sm px-4 py-1 ${
              !activeCategory ? "bg-yellow-400 text-gray-900" : ""
            }`}
            onClick={() => {
              setActiveCategory(null);
              setCurrentPage(1);
            }}
          >
            All Categories
          </CustomButton>
          {categories.map((cat) => (
            <CustomButton
              key={cat}
              className={`text-sm px-4 py-1 ${
                activeCategory === cat ? "bg-yellow-400 text-gray-900" : ""
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </CustomButton>
          ))}
        </div>

        {/* Tags + Clear Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 items-center">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`text-yellow-400 text-sm px-3 py-1 rounded-full cursor-pointer transition-all duration-300
                ${
                  activeTags.includes(tag)
                    ? "bg-yellow-400/20"
                    : "bg-yellow-400/10"
                } 
                hover:bg-yellow-400/20`}
            >
              {tag}
            </span>
          ))}
          {/* Clear Tags Button */}
          {activeTags.length > 0 && (
            <button
              onClick={() => {
                setActiveTags([]);
                setCurrentPage(1);
              }}
              className="text-sm px-4 py-1 rounded-lg font-medium 
             border border-red-500 text-red-500 
             hover:bg-red-200 hover:text-black 
             transition-all duration-300"
            >
              Clear Tags
            </button>
          )}
        </div>

        {/* Blog Cards */}
        {currentPosts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            No posts match the selected category/tags.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4 items-center">
            <CustomButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </CustomButton>
            <span className="text-yellow-400 font-semibold px-4 py-2 text-center">
              Page {currentPage} of {totalPages}
            </span>
            <CustomButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </CustomButton>
          </div>
        )}
      </div>
    </section>
  );
}
