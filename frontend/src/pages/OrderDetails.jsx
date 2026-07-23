import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/orderService";

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const response = await getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Order #{order.id}
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Shipping Information
          </h2>

          <p>
            <strong>Address:</strong> {order.shippingAddress}
          </p>

          <p>
            <strong>Phone:</strong> {order.phoneNumber}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-4">
                  Product
                </th>

                <th className="p-4">
                  Price
                </th>

                <th className="p-4">
                  Qty
                </th>

                <th className="p-4">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {order.items.map(item => (

                <tr key={item.productId} className="border-b">

                  <td className="p-4">
                    {item.productName}
                  </td>

                  <td className="p-4 text-center">
                    ₹{item.price}
                  </td>

                  <td className="p-4 text-center">
                    {item.quantity}
                  </td>

                  <td className="p-4 text-center">
                    ₹{item.total}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="p-6 text-right">

            <h2 className="text-2xl font-bold">
              Total: ₹{order.totalAmount}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;