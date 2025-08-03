import React, { useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    const blog = {
      title,
      bannerImage,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      categories: [category],
      author: user.displayName || user.email,
      authorId: user.uid,
      date: serverTimestamp(),
      likes: 0,
      comments: [],
      views: 0,
    };

    try {
      const docRef = await addDoc(collection(db, "blogs"), blog);
      navigate(`/blog/${docRef.id}`);
    } catch (err) {
      console.error("Error creating blog:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <p className="p-4 text-center">Please log in to create a blog post.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Create Blog Post</h1>
      <Input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="url"
        placeholder="Banner Image URL"
        value={bannerImage}
        onChange={(e) => setBannerImage(e.target.value)}
        required
      />
      <Textarea
        rows={8}
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
};

export default CreateBlogForm;
