import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { addToCart } from "../../services/cartService";

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "../../services/wishlistService";

import useAuth from "../../hooks/useAuth";

const ProductCard = ({ product }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | CHECK WISHLIST STATUS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user || !product?.id) {
      setWishlist(false);
      return;
    }

    checkWishlistStatus();
  }, [user, product?.id]);

  const checkWishlistStatus = async () => {
    try {
      const response = await checkWishlist(product.id);

      setWishlist(response.data === true);
    } catch (error) {
      console.error("Unable to check wishlist:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add products to cart.");
      return;
    }

    if (product.stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    setCartLoading(true);

    try {
      /*
       * IMPORTANT:
       * Your backend expects AddToCartRequest.
       *
       * We are assuming the request contains:
       * productId + quantity
       */

      await addToCart({
        productId: product.id,
        quantity: 1,
      });

      toast.success("Product added to cart.");
    } catch (error) {
      console.error("Add to cart error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Unable to add product to cart.";

      toast.error(message);
    } finally {
      setCartLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE WISHLIST
  |--------------------------------------------------------------------------
  */

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to use your wishlist.");
      return;
    }

    setWishlistLoading(true);

    try {
      if (wishlist) {
        await removeFromWishlist(product.id);

        setWishlist(false);

        toast.success("Removed from wishlist.");
      } else {
        await addToWishlist(product.id);

        setWishlist(true);

        toast.success("Added to wishlist.");
      }
    } catch (error) {
      console.error("Wishlist error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Unable to update wishlist.";

      toast.error(message);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* DISCOUNT */}

        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          20% OFF
        </span>

        {/* ACTION BUTTONS */}

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {/* WISHLIST */}

          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistLoading}
            title={wishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition ${
              wishlist
                ? "bg-red-500 text-white"
                : "bg-white text-slate-600 hover:bg-red-500 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <FiHeart size={18} className={wishlist ? "fill-current" : ""} />
          </button>

          {/* VIEW */}

          <Link
            to={`/product/${product.id}`}
            title="View product"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-blue-600 hover:text-white"
          >
            <FiEye size={18} />
          </Link>
        </div>
      </div>

      {/* =====================================================
          DETAILS
      ====================================================== */}

      <div className="p-5">
        {/* CATEGORY */}

        {product.categoryName && (
          <p className="text-sm font-medium text-blue-600">
            {product.categoryName}
          </p>
        )}

        {/* NAME */}

        <h3 className="mt-2 line-clamp-2 text-xl font-bold text-slate-800">
          {product.name}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        {/* RATING */}

        <div className="mt-4 flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className="text-yellow-400" size={14} />
          ))}

          <span className="ml-2 text-sm text-slate-500">(4.8)</span>
        </div>

        {/* PRICE */}

        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl font-bold text-blue-700">
            ₹{product.price}
          </span>

          <span className="text-sm text-slate-400 line-through">
            ₹{Math.round((Number(product.price) || 0) * 1.2)}
          </span>
        </div>

        {/* STOCK */}

        {product.stock !== undefined && (
          <p
            className={`mt-2 text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>
        )}

        {/* BUTTONS */}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={cartLoading || product.stock <= 0}
            className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <FiShoppingCart className="mr-2" />

            {cartLoading
              ? "Adding..."
              : product.stock <= 0
                ? "Out of Stock"
                : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product.id}`}
            className="rounded-xl border border-blue-600 px-5 py-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
