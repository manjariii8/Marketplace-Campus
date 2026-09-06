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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);

    try {
      const response = await getCategories();


      const categoryData = response.data?.data;

      setCategories(
        Array.isArray(categoryData) ? categoryData : []
      );
    } catch (error) {
      console.error("Failed to load categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="mb-6 text-xl font-bold text-slate-800">
        Filters
      </h3>

      {/* CATEGORY */}

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Category
      </label>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        disabled={loading}
        className="mb-6 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
      >
        <option value="">
          {loading ? "Loading categories..." : "All Categories"}
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      {/* MIN PRICE */}

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Minimum Price
      </label>

      <input
        type="number"
        min="0"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="₹ Minimum"
        className="mb-5 w-full rounded-xl border border-slate-300 p-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

      {/* MAX PRICE */}

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Maximum Price
      </label>

      <input
        type="number"
        min="0"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="₹ Maximum"
        className="mb-6 w-full rounded-xl border border-slate-300 p-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

      {/* APPLY */}

      <button
        type="button"
        onClick={onApply}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
      >
        Apply Filters
      </button>

    </aside>
  );
};

export default FilterSidebar;