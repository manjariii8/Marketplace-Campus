import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrder } from "../services/orderService";
import { createPaymentOrder } from "../services/paymentService";
import { openRazorpay } from "../utils/razorpay";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Professional in-page notification
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      setPageLoading(true);
      setNotification({
        type: "",
        message: "",
      });

      const response = await getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error("Unable to load order:", error);

      setNotification({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Unable to load order details. Please try again.",
      });
    } finally {
      setPageLoading(false);
    }
  }

  async function handlePayment() {
    if (!order?.id) return;

    try {
      setLoading(true);

      setNotification({
        type: "info",
        message: "Preparing secure payment...",
      });

      const paymentResponse =
        await createPaymentOrder(order.id);

      await openRazorpay(
        paymentResponse.data,

        async () => {
          try {
            setNotification({
              type: "success",
              message:
                "Payment successful! Updating your order...",
            });

            await loadOrder();

            setNotification({
              type: "success",
              message:
                "Payment successful! Your order is now confirmed.",
            });
          } catch (error) {
            console.error(
              "Unable to refresh order:",
              error
            );

            setNotification({
              type: "success",
              message:
                "Payment was successful. Please refresh the page to see the latest order status.",
            });
          }
        },

        (error) => {
          console.error("Payment failed:", error);

          setNotification({
            type: "error",
            message:
              "Payment was cancelled or could not be completed. Your order is still pending.",
          });
        }
      );
    } catch (error) {
      console.error(
        "Unable to start payment:",
        error
      );

      setNotification({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Unable to start payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const trackingSteps = [
    {
      key: "PENDING",
      title: "Order Placed",
      description:
        "Your order has been placed successfully.",
      icon: "🛍️",
    },
    {
      key: "CONFIRMED",
      title: "Order Confirmed",
      description:
        "Your payment has been confirmed and your order is being prepared.",
      icon: "✓",
    },
    {
      key: "PROCESSING",
      title: "Processing",
      description:
        "The seller is preparing your order.",
      icon: "📦",
    },
    {
      key: "SHIPPED",
      title: "Shipped",
      description:
        "Your order has been handed over for delivery.",
      icon: "🚚",
    },
    {
      key: "DELIVERED",
      title: "Delivered",
      description:
        "Your order has been delivered successfully.",
      icon: "🏠",
    },
  ];

  const statusIndex = useMemo(() => {
    if (!order) return 0;

    const index = trackingSteps.findIndex(
      (step) => step.key === order.status
    );

    return index === -1 ? 0 : index;
  }, [order]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-200";

      case "PROCESSING":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "DELIVERED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";

      case "PENDING":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const formatDate = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  /*
   * Payment status support.
   *
   * If your backend already returns paymentStatus,
   * this will use it.
   *
   * Otherwise the UI falls back to order.status.
   */
  const paymentStatus =
    order?.paymentStatus?.toUpperCase();

  const isPending =
    order?.status === "PENDING";

  const isCancelled =
    order?.status === "CANCELLED";

  const isPaymentPaid =
  paymentStatus === "PAID" ||
  paymentStatus === "SUCCESS" ||
  paymentStatus === "COMPLETED" ||
  (order?.status && order.status !== "PENDING");

  const isPaymentFailed =
    paymentStatus === "FAILED";

  const getNotificationStyles = () => {
    switch (notification.type) {
      case "success":
        return {
          container:
            "border-green-200 bg-green-50",
          icon:
            "bg-green-100 text-green-700",
          title:
            "text-green-800",
          message:
            "text-green-700",
        };

      case "error":
        return {
          container:
            "border-red-200 bg-red-50",
          icon:
            "bg-red-100 text-red-700",
          title:
            "text-red-800",
          message:
            "text-red-700",
        };

      case "info":
      default:
        return {
          container:
            "border-blue-200 bg-blue-50",
          icon:
            "bg-blue-100 text-blue-700",
          title:
            "text-blue-800",
          message:
            "text-blue-700",
        };
    }
  };

  const notificationStyles =
    getNotificationStyles();

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">
            📦
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Order not found
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't find the order you're looking for.
          </p>

          {notification.message && (
            <p className="mt-4 text-sm text-red-600">
              {notification.message}
            </p>
          )}

          <Link
            to="/orders"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

          <Link
            to="/orders"
            className="transition hover:text-blue-600"
          >
            My Orders
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-700">
            Order #{order.id}
          </span>

        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Order Details
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Order #{order.id}
            </h1>

            {order.createdAt && (
              <p className="mt-2 text-sm text-slate-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            )}
          </div>

          <div
            className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyles(
              order.status
            )}`}
          >
            {order.status}
          </div>

        </div>

        {/* Professional Notification */}
        {notification.message && (
          <div
            className={`mb-8 rounded-2xl border p-4 shadow-sm ${notificationStyles.container}`}
          >
            <div className="flex items-start gap-3">

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${notificationStyles.icon}`}
              >
                {notification.type === "success"
                  ? "✓"
                  : notification.type === "error"
                  ? "!"
                  : "i"}
              </div>

              <div className="flex-1">
                <p
                  className={`font-semibold ${notificationStyles.title}`}
                >
                  {notification.type === "success"
                    ? "Success"
                    : notification.type === "error"
                    ? "Payment Notice"
                    : "Please Wait"}
                </p>

                <p
                  className={`mt-1 text-sm ${notificationStyles.message}`}
                >
                  {notification.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setNotification({
                    type: "",
                    message: "",
                  })
                }
                className="rounded-lg p-1 text-slate-400 transition hover:bg-white/60 hover:text-slate-600"
                aria-label="Close notification"
              >
                ×
              </button>

            </div>
          </div>
        )}

        {/* Cancelled Order */}
        {isCancelled && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-700">
                !
              </div>

              <div>
                <h2 className="font-bold text-red-800">
                  This order has been cancelled
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  This order will not be processed or delivered.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Order Tracking */}
        {!isCancelled && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                Track Your Order
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Follow the progress of your order from placement to delivery.
              </p>
            </div>

            <div className="relative">

              <div className="absolute left-[22px] top-6 hidden h-[calc(100%-48px)] w-0.5 bg-slate-200 sm:block" />

              <div className="space-y-8">

                {trackingSteps.map(
                  (step, index) => {

                    const completed =
                      statusIndex >= index;

                    const current =
                      statusIndex === index;

                    return (
                      <div
                        key={step.key}
                        className="relative flex gap-5"
                      >

                        <div
                          className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-bold shadow-sm ${
                            completed
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {completed
                            ? step.icon
                            : index + 1}
                        </div>

                        <div className="min-w-0 flex-1 pt-1">

                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                            <h3
                              className={`font-semibold ${
                                completed
                                  ? "text-slate-900"
                                  : "text-slate-400"
                              }`}
                            >
                              {step.title}
                            </h3>

                            {current && (
                              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                Current Status
                              </span>
                            )}

                          </div>

                          <p
                            className={`mt-1 text-sm ${
                              completed
                                ? "text-slate-500"
                                : "text-slate-400"
                            }`}
                          >
                            {step.description}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            </div>
          </div>
        )}

        {/* Shipping + Payment */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">

          {/* Shipping */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                📍
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Shipping Information
                </h2>

                <p className="text-sm text-slate-500">
                  Delivery details
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {order.shippingAddress || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Phone Number
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {order.phoneNumber || "Not available"}
                </p>
              </div>

            </div>

          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                💳
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Payment
                </h2>

                <p className="text-sm text-slate-500">
                  Payment information
                </p>
              </div>

            </div>

            {/* Failed */}
            {isPaymentFailed && (
              <div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                      !
                    </div>

                    <div>
                      <p className="font-semibold text-red-800">
                        Payment Failed
                      </p>

                      <p className="mt-1 text-sm text-red-700">
                        Your payment was not completed. You can try again.
                      </p>
                    </div>

                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-5 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : "💳 Try Payment Again"}
                </button>
              </div>
            )}

            {/* Pending */}
            {!isPaymentFailed &&
              !isPaymentPaid &&
              isPending && (
                <div>

                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">
                        ₹
                      </div>

                      <div>
                        <p className="font-semibold text-yellow-800">
                          Payment Required
                        </p>

                        <p className="mt-1 text-sm text-yellow-700">
                          Complete your payment to confirm this order.
                        </p>
                      </div>

                    </div>

                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-5 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Processing Payment...
                      </span>
                    ) : (
                      "💳 Pay Now"
                    )}
                  </button>

                </div>
              )}

            {/* Paid */}
            {!isPaymentFailed &&
              isPaymentPaid && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold text-green-800">
                        Payment Confirmed
                      </p>

                      <p className="mt-1 text-sm text-green-700">
                        Your payment has been successfully processed.
                      </p>
                    </div>

                  </div>

                </div>
              )}

          </div>
        </div>

        {/* Order Items */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Order Items
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {order.items?.length || 0} item
              {(order.items?.length || 0) !== 1
                ? "s"
                : ""} in this order
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>

                </tr>
              </thead>

              <tbody>

                {order.items?.map(
                  (item, index) => (
                    <tr
                      key={
                        item.productId ||
                        index
                      }
                      className="border-b border-slate-100 last:border-0"
                    >

                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {item.productName}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-center text-slate-600">
                        ₹{formatCurrency(item.price)}
                      </td>

                      <td className="px-6 py-5 text-center text-slate-600">
                        {item.quantity}
                      </td>

                      <td className="px-6 py-5 text-right font-semibold text-slate-900">
                        ₹{formatCurrency(item.total)}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-100 md:hidden">

            {order.items?.map(
              (item, index) => (
                <div
                  key={
                    item.productId ||
                    index
                  }
                  className="p-5"
                >

                  <div className="flex justify-between gap-4">

                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.productName}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        ₹{formatCurrency(item.price)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-slate-900">
                      ₹{formatCurrency(item.total)}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          {/* Total */}
          <div className="border-t border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center justify-between">

              <span className="text-base font-medium text-slate-600">
                Order Total
              </span>

              <span className="text-2xl font-bold text-slate-900">
                ₹{formatCurrency(order.totalAmount)}
              </span>

            </div>

          </div>

        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/orders"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to My Orders
          </Link>

          <Link
            to="/products"
            className="rounded-xl bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
