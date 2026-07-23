import { Link } from "react-router-dom";

const EmptyOrders = () => {
  return (
    <div className="py-24 text-center">

      <h2 className="text-4xl font-bold text-slate-800">
        No Orders Yet
      </h2>

      <p className="mt-4 text-slate-500">
        Start shopping to place your first order.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
      >
        Shop Now
      </Link>

    </div>
  );
};

export default EmptyOrders;