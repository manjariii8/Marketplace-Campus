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

  const [formData, setFormData] = useState({
    shippingAddress: "",
    phoneNumber: "",
  });

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    setLoading(true);

    try {
      const orderResponse = await placeOrder(formData);

      const paymentResponse = await createPaymentOrder(orderResponse.data.id);

      openRazorpay(
        paymentResponse.data,
        () => {
          navigate("/order-success", {
            state: orderResponse.data,
          });
        },
        () => {
          alert("Payment failed or cancelled.");
        },
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-500">
            Complete your shipping details to place your order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <CheckoutSummary items={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
