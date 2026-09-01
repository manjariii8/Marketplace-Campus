import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart, FiZap } from "react-icons/fi";
import toast from "react-hot-toast";

import QuantitySelector from "./QuantitySelector";

import { addToCart } from "../../services/cartService";

import useAuth from "../../hooks/useAuth";

const ProductInfo = ({
  product,
  quantity,
  setQuantity,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [addingToCart, setAddingToCart] =
    useState(false);

  const [buyingNow, setBuyingNow] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = async () => {
    if (!user) {
      toast.error(
        "Please login to add products to cart."
      );

      navigate("/login");
      return;
    }

    if (!product?.id) {
      toast.error("Product information is missing.");
      return;
    }

    if (
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      toast.error("This product is out of stock.");
      return;
    }

    if (!quantity || quantity < 1) {
      toast.error("Please select a valid quantity.");
      return;
    }

    setAddingToCart(true);

    try {
      await addToCart({
        productId: product.id,
        quantity: quantity,
      });

      toast.success(
        "Product added to cart successfully."
      );

    } catch (error) {
      console.error(
        "Add to cart failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Unable to add product to cart.";

      toast.error(message);

    } finally {
      setAddingToCart(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | BUY NOW
  |--------------------------------------------------------------------------
  */

  const handleBuyNow = async () => {
    if (!user) {
      toast.error(
        "Please login to continue."
      );

      navigate("/login");
      return;
    }

    if (!product?.id) {
      toast.error("Product information is missing.");
      return;
    }

    if (
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      toast.error("This product is out of stock.");
      return;
    }

    if (!quantity || quantity < 1) {
      toast.error("Please select a valid quantity.");
      return;
    }

    setBuyingNow(true);

    try {
      /*
       * Add the selected product to the cart first.
       */

      await addToCart({
        productId: product.id,
        quantity: quantity,
      });

      /*
       * Then go to checkout.
       */

      navigate("/checkout");

    } catch (error) {
      console.error(
        "Buy now failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Unable to continue to checkout.";

      toast.error(message);

    } finally {
      setBuyingNow(false);
    }
  };

  return (
    <div>

      {/* CATEGORY */}

      {product.categoryName && (
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {product.categoryName}
        </span>
      )}

      {/* PRODUCT NAME */}

      <h1 className="mt-4 text-4xl font-bold text-slate-800">
        {product.name}
      </h1>

      {/* RATING */}

      <div className="mt-4 flex items-center gap-2">

        {[1, 2, 3, 4, 5].map(
          (item) => (
            <FaStar
              key={item}
              className="text-yellow-400"
            />
          )
        )}

        <span className="text-slate-500">
          (4.8)
        </span>

      </div>

      {/* PRICE */}

      <h2 className="mt-6 text-5xl font-bold text-blue-700">
        ₹ {product.price}
      </h2>

      {/* DESCRIPTION */}

      <p className="mt-8 leading-8 text-slate-600">
        {product.description}
      </p>

      {/* STOCK */}

      {product.stock !== undefined && (
        <p
          className={`mt-5 font-semibold ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>
      )}

      {/* QUANTITY */}

      <div className="mt-8">

        <p className="mb-3 font-semibold text-slate-700">
          Quantity
        </p>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* ACTIONS */}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        {/* BUY NOW */}

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={
            buyingNow ||
            addingToCart ||
            product.stock <= 0
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FiZap size={20} />

          {buyingNow
            ? "Processing..."
            : "Buy Now"}
        </button>

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            addingToCart ||
            buyingNow ||
            product.stock <= 0
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FiShoppingCart size={20} />

          {addingToCart
            ? "Adding..."
            : "Add to Cart"}
        </button>

      </div>

      {/* SELLER */}

      <div className="mt-10 rounded-xl bg-slate-100 p-5">

        <h3 className="text-lg font-bold text-slate-800">
          Seller
        </h3>

        <p className="mt-2 text-slate-600">
          {product.sellerName ||
            "Marketplace Seller"}
        </p>

      </div>

    </div>
  );
};

export default ProductInfo;