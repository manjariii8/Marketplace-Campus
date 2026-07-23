import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src="https://placehold.co/500x350/f8fafc/1e293b?text=Product"
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          20% OFF
        </span>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">

          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition">
            <FiHeart />
          </button>

          <Link
            to={`/products/${product.id}`}
            className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
          >
            <FiEye />
          </Link>

        </div>

      </div>

      {/* Details */}
      <div className="p-5">

        <p className="text-sm text-blue-600 font-medium">
          {product.categoryName}
        </p>

        <h3 className="text-xl font-bold mt-2 text-slate-800 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-slate-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-4">

          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className="text-yellow-400"
              size={14}
            />
          ))}

          <span className="ml-2 text-sm text-slate-500">
            (4.8)
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-5">

          <span className="text-2xl font-bold text-blue-700">
            ₹{product.price}
          </span>

          <span className="line-through text-slate-400">
            ₹{Math.round((Number(product?.price) || 0) * 1.2)}
          </span>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            <FiShoppingCart className="inline mr-2" />
            Add to Cart
          </button>

          <Link
            to={`/products/${product.id}`}
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;