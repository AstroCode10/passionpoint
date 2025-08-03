import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path is correct
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogAndUpdateViews = async () => {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const blogData = blogSnap.data();

        // Increment the views
        await updateDoc(blogRef, {
          views: increment(1)
        });

        // Update state with new data
        setBlog({ id: blogSnap.id, ...blogData, views: blogData.views + 1 });
      } else {
        console.error("No such blog!");
      }
    };

    fetchBlogAndUpdateViews();
  }, [id]);

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

      <div className="mt-6 flex gap-3 flex-wrap">
        {blog.tags?.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;