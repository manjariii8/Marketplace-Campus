const SortDropdown = ({
  sortBy,
  setSortBy,
}) => {

  return (
    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value)
      }
      className="rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    >

      <option value="createdAt">
        Newest
      </option>

      <option value="price">
        Price: Low to High
      </option>

      <option value="priceDesc">
        Price: High to Low
      </option>

      <option value="name">
        Name
      </option>

    </select>
  );
};

export default SortDropdown;