import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

const FilterSidebar = ({
  categoryId,
  setCategoryId,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">

      <h3 className="text-xl font-bold text-slate-800 mb-6">
        Filters
      </h3>

      <label className="block mb-2 font-medium">Category</label>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full rounded-lg border p-3 mb-5"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">
        Minimum Price
      </label>

      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full rounded-lg border p-3 mb-5"
      />

      <label className="block mb-2 font-medium">
        Maximum Price
      </label>

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full rounded-lg border p-3 mb-6"
      />

      <button
        onClick={onApply}
        className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;