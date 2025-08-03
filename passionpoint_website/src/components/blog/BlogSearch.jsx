const BlogSearch = ({ setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search blogs..."
    className="border p-2 rounded-xl w-full md:w-64"
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

export default BlogSearch;
