export default function BlogCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col">
      <div className="h-56 w-full overflow-hidden rounded-t-3xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm mt-auto">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
}
