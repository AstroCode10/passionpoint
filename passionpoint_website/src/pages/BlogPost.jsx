import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../hooks/useAuth";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlogAndUpdateViews = async () => {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const blogData = blogSnap.data();

        // ✅ Fetch author username from Firestore
        let username = blogData.author || "Anonymous";
        if (blogData.authorId) {
          try {
            const userDoc = await getDoc(doc(db, "users", blogData.authorId));
            if (userDoc.exists()) {
              username = userDoc.data().username || username;
            }
          } catch (err) {
            console.error("Failed to fetch author username:", err);
          }
        }

        // ✅ Update views
        try {
          await updateDoc(blogRef, { views: increment(1) });
        } catch (err) {
          console.error("Views update failed:", err);
        }

        setBlog({
          id: blogSnap.id,
          ...blogData,
          author: username,
          views: blogData.views + 1,
        });

        // ✅ Check if current user already liked
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
      try {
        await updateDoc(blogRef, {
          likes: increment(-1),
          likedBy: arrayRemove(user.uid),
        });
        setBlog((prev) => ({ ...prev, likes: prev.likes - 1 }));
        setLiked(false);
      } catch (err) {
        console.error("Unlike failed:", err);
      }
    } else {
      try {
        await updateDoc(blogRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid),
        });
        setBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
        setLiked(true);
      } catch (err) {
        console.error("Like failed:", err);
      }
    }
  };

  if (!blog) return <div className="p-6 text-center text-xl">Loading...</div>;

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
      {/* Back to Blogs Button */}
      <button
        onClick={() => navigate("/blog")}
        className="absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 space-x-2 flex items-center"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        Back to Blogs
      </button>

      <img
        src={blog.bannerImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

      {/* ✅ Show author and dates */}
      <p className="text-sm text-gray-500 mb-6">
        By {blog.author} •{" "}
        {blog.date
          ? blog.date.toDate().toLocaleString()
          : "Just now"}{" "}
        {blog.updatedAt &&
          ` • Updated: ${blog.updatedAt.toDate().toLocaleString()}`}{" "}
        • 👀 {blog.views} views
      </p>


      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        {blog.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ✅ Updated Like Button with 👍 */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-lg font-semibold ${
            liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {liked ? "👍 Liked" : "👍 Like"}
        </button>
        <span>{blog.likes || 0} likes</span>
      </div>
    </div>
  );
};

export default BlogPost;


