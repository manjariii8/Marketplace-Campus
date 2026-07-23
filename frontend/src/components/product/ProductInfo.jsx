import { FaStar } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product, quantity, setQuantity }) => {
  return (
    <div>

      <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-700 text-sm font-semibold">
        {product.categoryName}
      </span>

      <h1 className="mt-4 text-4xl font-bold text-slate-800">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <FaStar
            key={item}
            className="text-yellow-400"
          />
        ))}

        <span className="text-slate-500">
          (4.8)
        </span>
      </div>

      <h2 className="mt-6 text-5xl font-bold text-blue-700">
        ₹ {product.price}
      </h2>

      <p className="mt-8 leading-8 text-slate-600">
        {product.description}
      </p>

      <div className="mt-8">

        <p className="font-semibold mb-3">
          Quantity
        </p>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      <div className="flex gap-4 mt-10">

        <button className="flex-1 rounded-xl bg-orange-500 py-4 text-white font-semibold hover:bg-orange-600">
          Buy Now
        </button>

        <button className="flex-1 rounded-xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700">
          Add to Cart
        </button>

      </div>

      <div className="mt-10 rounded-xl bg-slate-100 p-5">

        <h3 className="font-bold text-lg">
          Seller
        </h3>

        <p className="mt-2">
          {product.sellerName}
        </p>

      </div>

    </div>
  );
};

export default ProductInfo;