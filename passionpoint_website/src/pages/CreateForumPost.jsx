import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { categories } from "../constants/categories";

const CreateForumForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return <p className="p-4 text-center">Please log in to create a forum post.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const post = {
      title,
      content,
      category,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous",
      date: serverTimestamp(),
      likes: 0,
      likedBy: [],
      views: 0,
    };

    try {
      const docRef = await addDoc(collection(db, "forumPosts"), post);
      navigate(`/forum/${docRef.id}`);
    } catch (err) {
      console.error("Error creating forum post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Create Forum Post</h1>

      <Input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        rows={6}
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default CreateForumForm;

