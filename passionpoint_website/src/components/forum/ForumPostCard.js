import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed
import { useAuth } from "../../hooks/useAuth"; // adjust path if needed

const ForumPostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  // Update liked state whenever post or user changes
  useEffect(() => {
    if (user && post.likedBy?.includes(user.uid)) {
      setLiked(true);
    }
  }, [user, post]);

  const handleLike = async (e) => {
    e.preventDefault(); // prevent navigating to post page on like
    if (!user) return alert("Log in to like posts!");
    if (liked) return;

    const postRef = doc(db, "forumPosts", post.id);

    try {
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.uid),
      });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <Link
      to={`/forum/${post.id}`}
      className="block p-5 bg-white rounded-2xl shadow hover:shadow-lg transition relative"
    >
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
      <div className="text-sm text-gray-500 flex justify-between items-center">
        <span>
          {post.authorName || "Anonymous"} • {new Date(post.date?.toDate()).toLocaleDateString()}
        </span>
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-2 py-1 rounded ${
            liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          👍 {likes}
        </button>
      </div>
    </Link>
  );
};

export default ForumPostCard;

