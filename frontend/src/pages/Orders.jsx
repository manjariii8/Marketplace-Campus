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

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {

    if (!window.confirm("Cancel this order?")) return;

    try {
      await cancelOrder(id);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel order.");
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          My Orders
        </h1>

        <OrderList
          orders={orders}
          onCancel={handleCancel}
        />

      </div>

    </div>
  );
};

export default Orders;