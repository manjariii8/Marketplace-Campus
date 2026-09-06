import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { createPaymentOrder } from "../services/paymentService";
import { openRazorpay } from "../utils/razorpay";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    shippingAddress: "",
    phoneNumber: "",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
    });

    // Automatically remove notification after 5 seconds
    setTimeout(() => {
      setNotification({
        type: "",
        message: "",
      });
    }, 5000);
  };

  const closeNotification = () => {
    setNotification({
      type: "",
      message: "",
    });
  };

  async function loadCart() {
    try {
      setCartLoading(true);

      const response = await getCart();

      setCartItems(response.data || []);
    } catch (error) {
      console.error(error);

      showNotification(
        "error",
        error.response?.data?.message ||
          "Unable to load your cart. Please try again."
      );
    } finally {
      setCartLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setNotification({
      type: "",
      message: "",
    });

    // Empty cart validation
    if (cartItems.length === 0) {
      showNotification(
        "warning",
        "Your cart is empty. Please add a product before continuing."
      );

      return;
    }

    // Razorpay SDK validation
    if (!window.Razorpay) {
      showNotification(
        "error",
        "Payment service is currently unavailable. Please refresh the page and try again."
      );

      return;
    }

    // Shipping address validation
    if (!formData.shippingAddress.trim()) {
      showNotification(
        "warning",
        "Please enter your shipping address."
      );

      return;
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      showNotification(
        "warning",
        "Please enter your phone number."
      );

      return;
    }

    setLoading(true);

    try {
      /*
       * Step 1:
       * Create marketplace order
       */
      const orderResponse = await placeOrder(formData);

      const createdOrder = orderResponse.data;

      /*
       * Step 2:
       * Create Razorpay payment order
       */
      const paymentResponse =
        await createPaymentOrder(
          createdOrder.id
        );

      /*
       * Step 3:
       * Open Razorpay checkout
       */
      openRazorpay(
        paymentResponse.data,

        // Payment successful
        () => {
          navigate("/order-success", {
            state: createdOrder,
          });
        },

        // Payment failed/cancelled
        () => {
          setLoading(false);

          showNotification(
            "error",
            "Payment was cancelled or could not be completed. Your order has not been confirmed."
          );
        }
      );
    } catch (error) {
      console.error(error);

      showNotification(
        "error",
        error.response?.data?.message ||
          "We couldn't process your order. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your shipping details to place your order.
          </p>
        </div>

        {/* Notification */}
        {notification.message && (
          <div
            className={`mb-6 flex items-start justify-between gap-4 rounded-2xl border p-4 shadow-sm ${
              notification.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : notification.type === "warning"
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-green-200 bg-green-50 text-green-800"
            }`}
          >
            <div className="flex items-start gap-3">

              {/* Icon */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  notification.type === "error"
                    ? "bg-red-100 text-red-600"
                    : notification.type === "warning"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {notification.type === "error"
                  ? "!"
                  : notification.type === "warning"
                  ? "!"
                  : "✓"}
              </div>

              {/* Message */}
              <div>
                <p className="font-semibold">
                  {notification.type === "error"
                    ? "Something went wrong"
                    : notification.type === "warning"
                    ? "Please check"
                    : "Success"}
                </p>

                <p className="mt-1 text-sm opacity-90">
                  {notification.message}
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeNotification}
              className="rounded-lg p-1 text-current opacity-60 transition hover:bg-black/5 hover:opacity-100"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        )}

        {/* Checkout Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

              {/* Loading State */}
              {loading && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-700">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                  <div>
                    <p className="font-semibold">
                      Processing your order
                    </p>

                    <p className="text-sm text-blue-600">
                      Please wait. Do not close or refresh this page.
                    </p>
                  </div>
                </div>
              )}

              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
              />

            </div>
          </div>

          {/* Right Side */}
          <div className="self-start lg:sticky lg:top-6">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              {cartLoading ? (
                <div className="space-y-4">

                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

                  <div className="h-16 animate-pulse rounded-xl bg-gray-100" />

                  <div className="h-16 animate-pulse rounded-xl bg-gray-100" />

                  <div className="h-10 animate-pulse rounded-xl bg-gray-200" />

                </div>
              ) : (
                <CheckoutSummary items={cartItems} />
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
