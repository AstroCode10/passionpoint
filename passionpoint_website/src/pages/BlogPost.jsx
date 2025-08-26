import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db } from "../firebase";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an auth hook

const BlogPost = () => {
  const { id } = useParams();
  const { user } = useAuth(); // current logged-in user
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlogAndUpdateViews = async () => {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const blogData = blogSnap.data();

        // Increment views
        await updateDoc(blogRef, { views: increment(1) });

        setBlog({ id: blogSnap.id, ...blogData, views: blogData.views + 1 });

        // Check if user has liked
        if (user && blogData.likedBy?.includes(user.uid)) {
          setLiked(true);
        }
      } else {
        console.error("No such blog!");
      }
    };

    fetchBlogAndUpdateViews();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return alert("You must be logged in to like posts.");

    const blogRef = doc(db, "blogs", id);

    if (liked) {
      // Unlike
      await updateDoc(blogRef, {
        likes: increment(-1),
        likedBy: arrayRemove(user.uid),
      });
      setBlog((prev) => ({ ...prev, likes: prev.likes - 1 }));
      setLiked(false);
    } else {
      // Like
      await updateDoc(blogRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.uid),
      });
      setBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setLiked(true);
    }
  };

  if (!blog) return <div className="p-6 text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
      <img src={blog.bannerImage} alt={blog.title} className="w-full h-64 object-cover rounded-xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {blog.author} • {new Date(blog.date).toLocaleDateString()} • 👀 {blog.views} views
      </p>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {/* Tags */}
      <div className="mt-6 flex gap-3 flex-wrap">
        {blog.tags?.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">#{tag}</span>
        ))}
      </div>

      {/* Like button */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-lg font-semibold ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <span>{blog.likes || 0} likes</span>
      </div>
    </div>
  );
};

export default BlogPost;
