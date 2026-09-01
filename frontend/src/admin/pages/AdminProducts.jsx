import { useEffect, useState } from "react";
import {
  getAdminProducts,
  searchAdminProducts,
  hideProduct,
  showProduct,
  deleteAdminProduct,
} from "../services/adminService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminProducts();

      setProducts(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await searchAdminProducts(
        keyword.trim()
      );

      setProducts(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to search products."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (product) => {
    try {
      setProcessingId(product.id);
      setError("");

      if (product.active) {
        await hideProduct(product.id);
      } else {
        await showProduct(product.id);
      }

      setProducts((current) =>
        current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                active: !item.active,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to update product."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}" permanently?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(product.id);
      setError("");

      await deleteAdminProduct(product.id);

      setProducts((current) =>
        current.filter(
          (item) => item.id !== product.id
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusStyle = (active) => {
    return active
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";
  };

  const getStockStyle = (stock) => {
    if (stock === 0) {
      return "text-red-600 font-semibold";
    }

    if (stock <= 5) {
      return "text-yellow-600 font-semibold";
    }

    return "text-gray-700";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          Manage products listed across the marketplace.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            placeholder="Search products..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setKeyword("");
              loadProducts();
            }}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Reset
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Seller
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg">
                          📦
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category || "—"}
                    </td>

                    {/* Seller */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.seller || "—"}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    {/* Stock */}
                    <td
                      className={`px-6 py-4 text-sm ${getStockStyle(
                        product.stock
                      )}`}
                    >
                      {product.stock ?? 0}

                      {product.stock === 0 && (
                        <span className="ml-2 text-xs">
                          Out of stock
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          product.active
                        )}`}
                      >
                        {product.active
                          ? "VISIBLE"
                          : "HIDDEN"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleToggleVisibility(
                              product
                            )
                          }
                          disabled={
                            processingId === product.id
                          }
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
                            product.active
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {processingId === product.id
                            ? "Processing..."
                            : product.active
                            ? "Hide"
                            : "Show"}
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product)
                          }
                          disabled={
                            processingId === product.id
                          }
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {products.length} product
          {products.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default Products;