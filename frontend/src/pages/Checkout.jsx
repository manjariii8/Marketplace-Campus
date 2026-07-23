import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import BackButton from "../components/common/BackButton";

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

    setLoading(true);

    try {
      const response = await placeOrder(formData);

      navigate("/order-success", {
        state: response.data,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BackButton />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>
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
              <CheckoutSummary
                items={cartItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;