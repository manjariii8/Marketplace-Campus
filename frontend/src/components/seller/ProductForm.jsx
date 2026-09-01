import { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  X,
  Package,
  IndianRupee,
  Boxes,
  FileText,
  Tag,
  Loader2,
} from "lucide-react";

import { getCategories } from "../../services/categoryService";

const ProductForm = ({ formData, setFormData, onSubmit, loading }) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  /* =========================
     LOAD CATEGORIES
  ========================= */

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategoryError("");

      const response = await getCategories();

      console.log("Categories response:", response.data);

      /*
       * Supports both:
       *
       * { data: [...] }
       *
       * and:
       *
       * { success: true, data: [...] }
       */

      const categoryData = response?.data?.data || response?.data || [];

      if (Array.isArray(categoryData)) {
        setCategories(categoryData);
      } else {
        setCategories([]);
        setCategoryError("Invalid category response from server.");
      }
    } catch (error) {
      console.error("Unable to load categories:", error);

      setCategories([]);

      setCategoryError(
        error?.response?.data?.message || "Unable to load categories.",
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================
     IMAGE CHANGE
  ========================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      setFormData((previous) => ({
        ...previous,
        imageData: base64Image,
      }));

      setImagePreview(base64Image);
    };
    reader.onerror = () => {
      alert("Unable to read image.");
    };

    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      imageData: null,
    }));

    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* =========================
          BASIC INFORMATION
      ========================= */}

      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Package size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Basic Information</h3>

            <p className="text-sm text-slate-500">
              Enter the main details of your product.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* PRODUCT NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Name
            </label>

            <div className="relative">
              <Tag
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORY
      ========================= */}

      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Tag size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Category</h3>

            <p className="text-sm text-slate-500">
              Choose the category that best matches your product.
            </p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Product Category
        </label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          disabled={categoryLoading}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          required
        >
          <option value="">
            {categoryLoading ? "Loading categories..." : "Select a category"}
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {categoryError && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{categoryError}</p>

            <button
              type="button"
              onClick={loadCategories}
              className="mt-2 text-sm font-semibold text-red-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!categoryLoading && !categoryError && categories.length === 0 && (
          <p className="mt-2 text-sm text-amber-600">
            No categories are available. Please create categories from the admin
            panel first.
          </p>
        )}
      </section>

      {/* =========================
    PRICE & STOCK
========================= */}

      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Boxes size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Pricing & Inventory
            </h3>

            <p className="text-sm text-slate-500">
              Set your product price and available stock.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* =========================
        PRICE
    ========================= */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Enter the selling price in Indian Rupees.
            </p>
          </div>

          {/* =========================
        STOCK
    ========================= */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Stock Quantity
            </label>

            <div className="relative">
              <Boxes
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                name="stock"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Enter the number of products currently available.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <ImagePlus size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Product Image</h3>

            <p className="text-sm text-slate-500">
              Upload a clear image of your product.
            </p>
          </div>
        </div>

        {!imagePreview ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <ImagePlus size={26} />
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              Click to upload product image
            </p>

            <p className="mt-1 text-sm text-slate-500">
              PNG, JPG or WEBP • Maximum 2 MB
            </p>
          </button>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={imagePreview}
              alt="Product preview"
              className="h-80 w-full object-contain"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </section>

      {/* =========================
          SUBMIT
      ========================= */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || categoryLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}

          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
