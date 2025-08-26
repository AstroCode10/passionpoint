import React from "react";
import { Link } from "react-router-dom";

const ForumPostCard = ({ post }) => {
  return (
    <Link
      to={`/forum/${post.id}`}
      className="block p-5 bg-white rounded-2xl shadow hover:shadow-lg transition"
    >
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
      <div className="text-sm text-gray-500 flex justify-between items-center">
        <span>
          {post.authorName || "Anonymous"} • {new Date(post.date?.toDate()).toLocaleDateString()}
        </span>
        <span>👍 {post.likes || 0}</span>
      </div>
    </Link>
  );
};

export default ForumPostCard;

