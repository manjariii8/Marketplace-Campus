import { FiHeart, FiShoppingCart } from "react-icons/fi";

const WishlistCard = ({ item, onRemove, onMoveToCart }) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition">

      <img
        src="https://placehold.co/400x280?text=Product"
        alt={item.productName}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold text-slate-800">
          {item.productName}
        </h3>

        <p className="mt-2 text-slate-500">
          {item.categoryName}
        </p>

        <p className="mt-4 text-2xl font-bold text-blue-600">
          ₹{item.price}
        </p>

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => onMoveToCart(item.productId)}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FiShoppingCart />
            Move to Cart
          </button>

          <button
            onClick={() => onRemove(item.productId)}
            className="rounded-xl border border-red-500 px-4 text-red-600 hover:bg-red-50"
          >
            <FiHeart />
          </button>

        </div>

      </div>

    </div>
  );
};

export default WishlistCard;