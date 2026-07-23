import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartList from "../components/cart/CartList";
import OrderSummary from "../components/cart/OrderSummary";
import BackButton from "../components/common/BackButton";
import {
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../services/cartService";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await getCart();
      setItems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function increaseQuantity(item) {
    await updateCartQuantity(item.id, item.quantity + 1);
    loadCart();
  }

  async function decreaseQuantity(item) {
    if (item.quantity === 1) return;

    await updateCartQuantity(item.id, item.quantity - 1);
    loadCart();
  }

  async function removeItem(id) {
    if (!window.confirm("Remove this product from cart?")) return;

    await removeCartItem(id);
    loadCart();
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">Loading cart...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <img
          src="https://placehold.co/300x250?text=Empty+Cart"
          alt="Empty Cart"
          className="mx-auto mb-8"
        />

        <h1 className="text-4xl font-bold text-slate-800">
          Your Cart is Empty
        </h1>

        <p className="text-slate-500 mt-4">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="mt-8 block w-full rounded-xl bg-blue-600 py-4 text-center text-white hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <BackButton />

        <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <CartList
              items={items}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={removeItem}
            />
          </div>

          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
