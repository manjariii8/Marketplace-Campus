import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { addToCart } from "../services/cartService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [cartLoadingId, setCartLoadingId] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD WISHLIST
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);

    try {
      const response = await getWishlist();

      console.log(
        "Wishlist response:",
        response.data
      );

      /*
       * Backend WishlistController returns:
       *
       * ResponseEntity<List<WishlistResponse>>
       *
       * Therefore response.data itself should be
       * the array.
       */

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setWishlist(data);
    } catch (error) {
      console.error(
        "Unable to load wishlist:",
        error
      );

      toast.error(
        "Unable to load wishlist."
      );

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE FROM WISHLIST
  |--------------------------------------------------------------------------
  */

  const handleRemove = async (productId) => {
    setRemovingId(productId);

    try {
      await removeFromWishlist(productId);

      setWishlist((current) =>
        current.filter(
          (item) =>
            getProductId(item) !== productId
        )
      );

      toast.success(
        "Removed from wishlist."
      );
    } catch (error) {
      console.error(
        "Remove wishlist error:",
        error
      );

      toast.error(
        "Unable to remove product."
      );
    } finally {
      setRemovingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = async (product) => {
    const productId = getProductId(product);

    setCartLoadingId(productId);

    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      toast.success(
        "Product added to cart."
      );
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Unable to add product to cart.";

      toast.error(message);
    } finally {
      setCartLoadingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | PRODUCT ID
  |--------------------------------------------------------------------------
  |
  | Depending on your WishlistResponse, the product
  | may be directly inside item or inside item.product.
  |
  */

  const getProductId = (item) => {
    return (
      item?.productId ||
      item?.product?.id ||
      item?.id
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PRODUCT DATA
  |--------------------------------------------------------------------------
  */

  const getProduct = (item) => {
    return item?.product || item;
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="mb-10">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-3 h-5 w-80 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-56 animate-pulse bg-slate-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-5 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 animate-pulse rounded bg-slate-200" />
                    <div className="h-10 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              )
            )}

          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6">

          <div className="w-full rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <FiHeart
                size={36}
                className="text-red-500"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-800">
              Your Wishlist is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Save products you love and come
              back to them anytime.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | WISHLIST PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <FiHeart
                  size={24}
                  className="text-red-500"
                />
              </div>

              <div>

                <h1 className="text-3xl font-bold text-slate-800">
                  My Wishlist
                </h1>

                <p className="mt-1 text-slate-500">
                  Your saved products.
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "saved product"
              : "saved products"}
          </div>

        </div>

        {/* PRODUCTS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {wishlist.map((item) => {

            const product =
              getProduct(item);

            const productId =
              getProductId(item);

            return (
              <div
                key={productId}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={
                      product?.imageUrl ||
                      product?.image ||
                      "https://placehold.co/500x350/f8fafc/1e293b?text=Product"
                    }
                    alt={
                      product?.name ||
                      "Product"
                    }
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* REMOVE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(productId)
                    }
                    disabled={
                      removingId === productId
                    }
                    title="Remove from wishlist"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>

                {/* DETAILS */}

                <div className="p-5">

                  {product?.categoryName && (
                    <p className="text-sm font-medium text-blue-600">
                      {product.categoryName}
                    </p>
                  )}

                  <h2 className="mt-2 line-clamp-2 text-lg font-bold text-slate-800">
                    {product?.name ||
                      "Product"}
                  </h2>

                  {product?.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {product.description}
                    </p>
                  )}

                  <p className="mt-4 text-2xl font-bold text-blue-700">
                    ₹
                    {product?.price ?? "0"}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-5 flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      disabled={
                        cartLoadingId ===
                        productId
                      }
                      className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >
                      <FiShoppingCart
                        className="mr-2"
                      />

                      {cartLoadingId ===
                      productId
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>

                    <Link
                      to={`/product/${productId}`}
                      className="flex items-center justify-center rounded-xl border border-blue-600 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* CONTINUE SHOPPING */}

        <div className="mt-12 text-center">

          <Link
            to="/products"
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Wishlist;