import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Textarea } from "@/components/ui/textarea";

const BlogEditor = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm();
  const [preview, setPreview] = useState(false);

  const content = watch("content");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-4">✍️ Write a New Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full p-3 rounded-xl border"
          placeholder="Blog Title"
          {...register("title", { required: true })}
        />

        <input
          className="w-full p-3 rounded-xl border"
          placeholder="Banner Image URL"
          {...register("bannerImage")}
        />

        <select className="w-full p-3 rounded-xl border" {...register("category")}>
          <option value="">Select a Category</option>
          <option value="Science">Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Technology & AI">Technology & AI</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Books">Books</option>
          <option value="History">History</option>
          <option value="Psychology">Psychology</option>
          <option value="Languages">Languages</option>
        </select>

        <input
          className="w-full p-3 rounded-xl border"
          placeholder="Tags (comma-separated)"
          {...register("tags")}
        />

        <Textarea
          className="min-h-[150px] border"
          placeholder="Write your blog content here in Markdown..."
          {...register("content", { required: true })}
        />

        <div className="flex gap-4 items-center">
          <Button type="submit">Publish</Button>
          <Button type="button" variant="outline" onClick={() => setPreview(!preview)}>
            {preview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </form>

      {preview && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-2xl font-semibold mb-2">📄 Preview:</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
