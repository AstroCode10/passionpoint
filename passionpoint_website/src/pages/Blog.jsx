import React, { useState, useEffect } from "react";
import BlogCard from "../components/blog/BlogCard";
import BlogFilter from "../components/blog/BlogFilter";
import BlogSort from "../components/blog/BlogSort";
import BlogSearch from "../components/blog/BlogSearch";
import { blogData } from "../utils/blogData";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [sort, setSort] = useState("recent");
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let sortedBlogs = [...blogData];

    // Filter by category
    if (category !== "All") {
      sortedBlogs = sortedBlogs.filter((blog) =>
        blog.category.includes(category)
      );
    }

    // Search
    if (searchTerm) {
      sortedBlogs = sortedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sort === "popular") {
      sortedBlogs.sort((a, b) => b.likes - a.likes);
    } else {
      sortedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setBlogs(sortedBlogs);
  }, [sort, category, searchTerm]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 PassionPoint Blog</h1>
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <BlogSearch setSearchTerm={setSearchTerm} />
        <BlogFilter category={category} setCategory={setCategory} />
        <BlogSort sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
