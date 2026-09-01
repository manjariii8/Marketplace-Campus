import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Package,
  Store,
  Loader2,
} from "lucide-react";

import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductById(id);

      const data = response?.data?.data || response?.data;

      setProduct(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">
            Product not found
          </h2>

          <p className="mt-2 text-slate-500">
            {error || "This product is no longer available."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const image =
    product.imageUrl ||
    product.image ||
    product.productImage ||
    "https://placehold.co/800x600/f8fafc/334155?text=Product";

  const category =
    product.categoryName || product.category?.name || "Uncategorized";

  const seller =
    product.sellerName || product.seller?.name || "Marketplace Seller";

  const stock = Number(product.stock) || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          {/* IMAGE */}

          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={image}
                alt={product.name}
                className="h-[520px] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x600/f8fafc/334155?text=Product";
                }}
              />
            </div>
          </div>

          {/* INFORMATION */}

          <div className="flex flex-col">
            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {category}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill="currentColor"
                  className="text-yellow-400"
                />
              ))}

              <span className="ml-2 text-sm text-slate-500">4.8</span>
            </div>

            <div className="mt-6">
              <span className="text-4xl font-bold text-blue-700">
                ₹{product.price}
              </span>
            </div>

            <div className="my-8 h-px bg-slate-200" />

            <h2 className="text-lg font-bold text-slate-900">Description</h2>

            <p className="mt-3 leading-7 text-slate-600">
              {product.description ||
                "No description available for this product."}
            </p>

            {/* STOCK */}

            <div className="mt-7 flex items-center gap-3">
              <Package size={20} className="text-blue-600" />

              {stock > 0 ? (
                <span className="font-semibold text-green-600">
                  {stock} items available
                </span>
              ) : (
                <span className="font-semibold text-red-600">Out of stock</span>
              )}
            </div>

            {/* SELLER */}

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Store size={20} className="text-blue-600" />

              <div>
                <p className="text-xs font-medium text-slate-500">Sold by</p>

                <p className="font-semibold text-slate-800">{seller}</p>
              </div>
            </div>

            {/* QUANTITY */}

            {stock > 0 && (
              <div className="mt-7">
                <p className="mb-3 font-semibold text-slate-800">Quantity</p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-lg hover:bg-slate-100"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="px-5 py-3 text-lg hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-8 flex gap-3">
              <button
                disabled={stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-300 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                <Heart size={21} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
