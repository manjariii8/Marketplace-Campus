import { Link } from "react-router-dom";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const OrderCard = ({ order, onCancel }) => {
  return (
    <div className="rounded-2xl bg-white shadow p-6 border border-slate-200">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-xl font-bold">
            Order #{order.id}
          </h3>

          <p className="text-slate-500 mt-2">
            {new Date(order.orderDate).toLocaleString()}
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <div>

          <p className="text-slate-500">
            Total Amount
          </p>

          <h2 className="text-2xl font-bold text-blue-600">
            ₹{order.totalAmount}
          </h2>

        </div>

        <div className="flex gap-3">

          <Link
            to={`/orders/${order.id}`}
            className="rounded-xl border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50"
          >
            View Details
          </Link>

          {order.status === "PENDING" && (
            <button
              onClick={() => onCancel(order.id)}
              className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default OrderCard;