import { useEffect, useState } from "react";
import EmptyOrders from "../components/orders/EmptyOrders";
import OrderList from "../components/orders/OrderList";
import {
  getOrders,
  cancelOrder,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cancel confirmation modal
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // User interface messages
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const response = await getOrders();

      setOrders(response.data);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to load your orders. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleCancelRequest(id) {
    setMessage({
      type: "",
      text: "",
    });

    setCancelOrderId(id);
  }

  function closeCancelModal() {
    if (cancelling) return;

    setCancelOrderId(null);
  }

  async function handleCancel() {
    if (!cancelOrderId) return;

    try {
      setCancelling(true);

      await cancelOrder(cancelOrderId);

      // Remove the cancelled order immediately from UI
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === cancelOrderId
            ? {
                ...order,
                status: "CANCELLED",
              }
            : order
        )
      );

      setCancelOrderId(null);

      setMessage({
        type: "success",
        text: `Order #${cancelOrderId} has been cancelled successfully.`,
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to cancel this order. Please try again.",
      });
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading your orders...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait a moment
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            My Orders
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your recent orders.
          </p>
        </div>

        {/* Success Message */}
        {message.type === "success" && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              ✓
            </div>

            <div className="flex-1">
              <p className="font-semibold text-emerald-800">
                Success
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                {message.text}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMessage({
                  type: "",
                  text: "",
                })
              }
              className="text-xl leading-none text-emerald-500 transition hover:text-emerald-800"
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {/* Error Message */}
        {message.type === "error" && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
              !
            </div>

            <div className="flex-1">
              <p className="font-semibold text-red-800">
                Something went wrong
              </p>

              <p className="mt-1 text-sm text-red-700">
                {message.text}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMessage({
                  type: "",
                  text: "",
                })
              }
              className="text-xl leading-none text-red-500 transition hover:text-red-800"
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {/* Orders */}
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <OrderList
            orders={orders}
            onCancel={handleCancelRequest}
          />
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Modal Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-7 w-7 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86l-8.04 14A2 2 0 003.98 21h16.04a2 2 0 001.73-3.14l-8.04-14a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            {/* Modal Content */}
            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Cancel Order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to cancel order{" "}
                <span className="font-semibold text-slate-700">
                  #{cancelOrderId}
                </span>
                ?
              </p>

              <p className="mt-2 text-xs text-slate-400">
                This action cannot be undone.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-7 flex gap-3">

              <button
                type="button"
                onClick={closeCancelModal}
                disabled={cancelling}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Keep Order
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelling ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Cancelling...
                  </span>
                ) : (
                  "Yes, Cancel"
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
