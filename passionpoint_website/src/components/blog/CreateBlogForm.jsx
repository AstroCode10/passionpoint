import React, { useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ArrowLeft } from "lucide-react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { categories } from "../../constants/categories";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateBlogForm = () => {
  const DEFAULT_BANNER = "/images/default-banner.png";

  const isValidImageUrl = (url) => /\.(jpeg|jpg|png|gif|webp)$/i.test(url);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  setIsSubmitting(true);
  const storage = getStorage();

  try {
    let finalBanner = DEFAULT_BANNER;

    if (file) {
      console.log("Uploading file:", file.name);
      const storageRef = ref(storage, `users/${user.uid}/banners/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      finalBanner = await getDownloadURL(storageRef);
      console.log("✅ File uploaded:", finalBanner);
    } else if (isValidImageUrl(bannerImage)) {
      finalBanner = bannerImage;
      console.log("✅ Using custom URL:", finalBanner);
    } else {
      console.log("⚠️ No valid image provided, using default banner.");
    }

    const blog = {
      title,
      bannerImage: finalBanner,
      content,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      category,
      author: user.displayName || user.email,
      authorId: user.uid,
      date: serverTimestamp(),
      likes: 0,
      comments: [],
      views: 0,
    };

    const docRef = await addDoc(collection(db, "blogs"), blog);
    console.log("✅ Blog published with ID:", docRef.id);
    navigate(`/blog/${docRef.id}`);
  } catch (err) {
    console.error("❌ Error creating blog:", err);
  } finally {
    setIsSubmitting(false);
  }
};


  if (!user)
    return <p className="p-4 text-center">Please log in to create a blog post.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-2xl mx-auto p-4 space-y-4"
    >
      {/* Back to Blogs Button */}
      <button
        type="button"
        onClick={() => navigate("/blog")}
        className="absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 space-x-2 flex items-center"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        Back to Blogs
      </button>

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
      />

      <p className="text-gray-500 text-sm">or upload an image</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
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

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
      >
        <option value="" disabled>
          Select a Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
};

export default CreateBlogForm;


