import React, { useState, useMemo } from "react";
import BlogCard from "../components/blog/BlogCard";
import BlogFilter from "../components/blog/BlogFilter";
import BlogSort from "../components/blog/BlogSort";
import BlogSearch from "../components/blog/BlogSearch";
import useBlogs from "../hooks/useBlog"; // Firebase hook

const Blog = () => {
  const { blogs, loading } = useBlogs();
  const [sort, setSort] = useState("recent");
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    let result = [...blogs];

    if (category !== "All") {
      result = result.filter((blog) =>
        blog.category?.includes(category)
      );
    }

    if (searchTerm) {
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort === "popular") {
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [blogs, sort, category, searchTerm]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 PassionPoint Blog</h1>
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <BlogSearch setSearchTerm={setSearchTerm} />
        <BlogFilter category={category} setCategory={setCategory} />
        <BlogSort sort={sort} setSort={setSort} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;