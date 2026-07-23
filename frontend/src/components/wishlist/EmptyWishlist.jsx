import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">

      <img
        src="https://placehold.co/300x250?text=Wishlist"
        alt="Empty Wishlist"
        className="mb-8"
      />

      <h2 className="text-4xl font-bold text-slate-800">
        Your Wishlist is Empty
      </h2>

      <p className="mt-4 text-slate-500">
        Save products you love and buy them later.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
      >
        Browse Products
      </Link>

    </div>
  );
};

export default EmptyWishlist;