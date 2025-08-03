const categories = ["All", "Science", "Mathematics", "Technology & AI", "Lifestyle", "Books", "History", "Psychology", "Languages"];

const BlogFilter = ({ category, setCategory }) => (
  <select
    className="border p-2 rounded-xl"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
);

export default BlogFilter;
