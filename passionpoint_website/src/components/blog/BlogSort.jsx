const BlogSort = ({ sort, setSort }) => (
  <select
    className="border p-2 rounded-xl"
    value={sort}
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="recent">Most Recent</option>
    <option value="popular">Most Popular</option>
  </select>
);

export default BlogSort;
