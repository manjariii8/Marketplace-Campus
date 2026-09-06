import { useEffect, useState } from "react";
import ProductGrid from "../product/ProductGrid";
import { getProducts } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        page: 0,
        size: 8,
        sortBy: "createdAt",
        direction: "desc",
      });

      // Supports both:
      // 1. Spring Page response -> { content: [...] }
      // 2. Normal array response -> [...]
      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data.slice(0, 8));
      } else if (Array.isArray(data?.content)) {
        setProducts(data.content);
      } else if (Array.isArray(data?.data)) {
        setProducts(data.data.slice(0, 8));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to load featured products:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load featured products."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-semibold uppercase tracking-wider text-blue-600">
              Latest Collection
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-800">
              Featured Products
            </h2>

            <p className="mt-3 text-slate-500">
              Discover our latest products and best picks.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>

            <button
              onClick={loadProducts}
              className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <h3 className="text-xl font-semibold text-slate-800">
                No featured products available
              </h3>

              <p className="mt-2 text-slate-500">
                Products will appear here once they are available.
              </p>
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <ProductGrid products={products} />
          )}
      </div>
    </section>
  );
};

export default FeaturedProducts;