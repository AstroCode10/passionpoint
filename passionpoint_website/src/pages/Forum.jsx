import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ForumPostCard from "../components/forum/ForumPostCard";

const Forum = () => {
  const [sort, setSort] = useState("recent");
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Realtime listener for forum posts
  const [snapshot, loading] = useCollection(collection(db, "forumPosts"));
  const posts = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || [];

  // Filtering & sorting
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (category !== "All") {
      result = result.filter((post) => post.category === category);
    }

    if (searchTerm) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort === "popular") {
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      result.sort((a, b) => new Date(b.date?.toDate()) - new Date(a.date?.toDate()));
    }

    return result;
  }, [posts, sort, category, searchTerm]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">💬 PassionPoint Forum</h1>
        <Link
          to="/forum/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          ➕ New Post
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
