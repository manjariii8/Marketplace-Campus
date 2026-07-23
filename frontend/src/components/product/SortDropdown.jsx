const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-600"
    >
      <option value="createdAt">Newest</option>
      <option value="price">Price</option>
      <option value="name">Name</option>
    </select>
  );
};

export default SortDropdown;