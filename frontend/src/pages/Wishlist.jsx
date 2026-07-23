import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";
import { addToCart } from "../services/cartService";

const Wishlist = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      const response = await getWishlist();
      setItems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId) {
    try {
      await removeFromWishlist(productId);
      loadWishlist();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleMoveToCart(productId) {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      await removeFromWishlist(productId);

      loadWishlist();

      alert("Product moved to cart.");
    } catch (error) {
      console.error(error);
      alert("Unable to move product.");
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Loading wishlist...
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              My Wishlist
            </h1>

            <p className="text-slate-500 mt-2">
              {items.length} saved products
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

        </div>

        <WishlistGrid
          items={items}
          onRemove={handleRemove}
          onMoveToCart={handleMoveToCart}
        />

      </div>

    </div>
  );
};

export default Wishlist;