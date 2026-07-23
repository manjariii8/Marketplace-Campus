import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          No order information found.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-10 text-center">

        <div className="flex justify-center">
          <FiCheckCircle className="text-green-500" size={90} />
        </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-800">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-slate-500">
          Thank you for shopping with us.
        </p>

        <div className="bg-slate-100 rounded-xl mt-8 p-6 text-left">

          <div className="flex justify-between mb-3">
            <span>Order ID</span>
            <span className="font-semibold">
              #{state.id}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Status</span>
            <span className="font-semibold text-blue-600">
              {state.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-bold text-green-600">
              ₹{state.totalAmount}
            </span>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            to="/orders"
            className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-white hover:bg-blue-700"
          >
            View Orders
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl border border-slate-300 py-3 text-center hover:bg-slate-100"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;