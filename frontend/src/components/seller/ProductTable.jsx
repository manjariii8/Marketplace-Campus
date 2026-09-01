import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Package,
  Loader2,
  Laptop,
  Smartphone,
  Shirt,
  Sofa,
  Watch,
  BookOpen,
  Headphones,
  Camera,
  ShoppingBag,
  Gamepad2,
  Dumbbell,
  Coffee,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteProduct, getMyProducts } from "../../services/productService";

const ProductTable = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getMyProducts();

      const data = response?.data?.data ?? response?.data ?? [];

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Unable to load seller products:", error);

      toast.error(
        error?.response?.data?.message || "Unable to load your products.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(product.id);

      await deleteProduct(product.id);

      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id),
      );

      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error?.response?.data?.message || "Unable to delete product.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 size={24} className="animate-spin text-blue-600" />

            <span>Loading your products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Products</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage all products listed in your store.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>

          <button
            onClick={() => navigate("/seller/products/add")}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* EMPTY */}

      {products.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <ShoppingBag size={30} className="text-blue-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            No products yet
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Start selling by adding your first product to the marketplace.
          </p>

          <button
            onClick={() => navigate("/seller/products/add")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => {
                const category =
                  product.categoryName || product.category?.name || "";

                return (
                  <tr key={product.id} className="transition hover:bg-slate-50">
                    {/* PRODUCT */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <ProductIcon product={product} category={category} />

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800">
                            {product.name}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                            {product.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {category || "Uncategorized"}
                      </span>
                    </td>

                    {/* PRICE */}

                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="font-semibold text-slate-800">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* STOCK */}

                    <td className="whitespace-nowrap px-6 py-5">
                      <StockBadge stock={product.stock} />
                    </td>

                    {/* ACTIONS */}

                    <td className="whitespace-nowrap px-6 py-5">
                      <div className="flex justify-end gap-2">
                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/seller/products/${product.id}`)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          title="View product"
                        >
                          <Eye size={18} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/seller/products/edit/${product.id}`)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          title="Edit product"
                        >
                          <Edit size={18} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          disabled={deletingId === product.id}
                          onClick={() => handleDelete(product)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete product"
                        >
                          {deletingId === product.id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* =====================================================
   STOCK BADGE
===================================================== */

const StockBadge = ({ stock }) => {
  const value = Number(stock ?? 0);

  if (value === 0) {
    return (
      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
        Out of Stock
      </span>
    );
  }

  if (value <= 5) {
    return (
      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
        Low Stock ({value})
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
      {value} Available
    </span>
  );
};

/* =====================================================
   PRODUCT ICON
===================================================== */

const ProductIcon = ({ product, category }) => {
  if (product.imageData) {
    return (
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <img
          src={product.imageData}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const categoryLower = category.toLowerCase();

  let Icon = Package;

  if (
    categoryLower.includes("electronic") ||
    categoryLower.includes("laptop") ||
    categoryLower.includes("computer")
  ) {
    Icon = Laptop;
  } else if (
    categoryLower.includes("mobile") ||
    categoryLower.includes("phone") ||
    categoryLower.includes("smartphone")
  ) {
    Icon = Smartphone;
  } else if (
    categoryLower.includes("fashion") ||
    categoryLower.includes("cloth") ||
    categoryLower.includes("shirt")
  ) {
    Icon = Shirt;
  } else if (categoryLower.includes("furniture")) {
    Icon = Sofa;
  } else if (
    categoryLower.includes("watch") ||
    categoryLower.includes("accessor")
  ) {
    Icon = Watch;
  } else if (categoryLower.includes("book")) {
    Icon = BookOpen;
  } else if (
    categoryLower.includes("headphone") ||
    categoryLower.includes("audio")
  ) {
    Icon = Headphones;
  } else if (
    categoryLower.includes("camera") ||
    categoryLower.includes("photography")
  ) {
    Icon = Camera;
  } else if (
    categoryLower.includes("game") ||
    categoryLower.includes("gaming")
  ) {
    Icon = Gamepad2;
  } else if (
    categoryLower.includes("sport") ||
    categoryLower.includes("fitness")
  ) {
    Icon = Dumbbell;
  } else if (
    categoryLower.includes("coffee") ||
    categoryLower.includes("kitchen")
  ) {
    Icon = Coffee;
  } else if (
    categoryLower.includes("beauty") ||
    categoryLower.includes("cosmetic")
  ) {
    Icon = Sparkles;
  } else if (
    categoryLower.includes("shop") ||
    categoryLower.includes("access")
  ) {
    Icon = ShoppingBag;
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
      <Icon size={22} strokeWidth={1.8} />
    </div>
  );
};

export default ProductTable;
