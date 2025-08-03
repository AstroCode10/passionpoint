import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
      <img src={blog.bannerImage} alt={blog.title} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          By {blog.author} | {new Date(blog.date).toLocaleDateString()}
        </p>

        <p className="text-gray-700 mb-4">
          {blog.content.slice(0, 120)}...
        </p>

        <Link
          to={`/blog/${blog.id}`}
          className="text-blue-600 hover:underline text-sm font-medium block mb-2"
        >
          Read more →
        </Link>

        <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1"><Heart size={16} /> {blog.likes}</span>
          <span className="flex items-center gap-1"><MessageSquare size={16} /> {blog.comments.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;