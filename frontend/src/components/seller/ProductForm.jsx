import { useEffect, useState } from "react";
import { FiPackage, FiDollarSign, FiLayers, FiFileText } from "react-icons/fi";
import { getCategories } from "../../services/categoryService";

const ProductForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
}) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoadingCategories(true);

      const response = await getCategories();

      const data = response.data;

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.content)) {
        setCategories(data.content);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "categoryId"
          ? Number(value)
          : value,
    }));
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Form */}

          <form
            onSubmit={onSubmit}
            className="p-8 space-y-8"
          >

            {/* General Information */}

            <div className="bg-slate-50 rounded-2xl p-6 border">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">

                <FiPackage />

                General Information

              </h2>

              <div className="space-y-6">

                <div>

                  <label className="block mb-2 font-semibold">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none transition"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-semibold">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none transition"
                  />

                </div>

              </div>

            </div>

            {/* Pricing */}

            <div className="bg-slate-50 rounded-2xl p-6 border">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">

                <FiDollarSign />

                Pricing & Inventory

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-2 font-semibold">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none"
                  />

                </div>

              </div>

            </div>

            {/* Category */}

            <div className="bg-slate-50 rounded-2xl p-6 border">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">

                <FiLayers />

                Category

              </h2>

              <label className="block mb-2 font-semibold">
                Select Category
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none"
              >
                <option value="">
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select Category"}
                </option>

                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}

              </select>

            </div>

            {/* Future Image Upload */}

            <div className="bg-slate-50 rounded-2xl p-6 border">

              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">

                <FiFileText />

                Product Image

              </h2>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
                Image upload will be added in the next phase.
              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-60"
            >
              {loading ? "Saving Product..." : "Save Product"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default ProductForm;