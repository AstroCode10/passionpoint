import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth"; // your auth hook
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Science");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to create a post!");

    await addDoc(collection(db, "forumPosts"), {
      title,
      content,
      category,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous",
      date: serverTimestamp(),
      likes: 0,
      likedBy: [],
      views: 0,
    });

    navigate("/forum");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-4">➕ Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-40"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Science">Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Technology & AI">Technology & AI</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Books">Bookse</option>
          <option value="History">History</option>
          <option value="Psychology">Psychology</option>
          <option value="Languages">Languages</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
