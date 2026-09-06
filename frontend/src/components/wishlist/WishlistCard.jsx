import { useEffect, useState } from "react";

import WishlistGrid from "../../components/wishlist/WishlistGrid";
import { getWishlist } from "../../services/wishlistService";

const Wishlist = () => {

  const [items, setItems] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    loadWishlist();

  }, []);


  async function loadWishlist() {

    try {

      setLoading(true);
      setError("");

      const response =
        await getWishlist();

      const result =
        response?.data;

      /*
       * Handle different API response structures.
       */

      let wishlistItems = [];

      if (Array.isArray(result)) {

        wishlistItems = result;

      } else if (Array.isArray(result?.data)) {

        wishlistItems = result.data;

      } else if (Array.isArray(result?.content)) {

        wishlistItems = result.content;

      }

      setItems(wishlistItems);

    } catch (error) {

      console.error(
        "Failed to load wishlist:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Unable to load wishlist."
      );

      setItems([]);

    } finally {

      setLoading(false);

    }
  }


  if (loading) {

    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <p className="mt-4 text-slate-500">
          Loading wishlist...
        </p>

      </div>
    );

  }


  return (
    <div className="min-h-screen bg-slate-50 py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-slate-500">
            Your saved products.
          </p>

        </div>


        {error ? (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <h2 className="font-bold text-red-700">
              Unable to load wishlist
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

          </div>

        ) : (

          <WishlistGrid
            items={items}
          />

        )}

      </div>

    </div>
  );
};

export default Wishlist;