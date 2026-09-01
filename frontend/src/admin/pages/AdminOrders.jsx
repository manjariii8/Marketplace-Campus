import { useEffect, useState } from "react";
import {
  getAdminOrders,
  getRecentAdminOrders,
  searchAdminOrders,
  getAdminOrdersByStatus,
  updateAdminOrderStatus,
} from "../services/adminService";

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminOrders();

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadRecentOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRecentAdminOrders();

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load recent orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      loadOrders();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await searchAdminOrders(
        keyword.trim()
      );

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to search orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = async (status) => {
    setSelectedStatus(status);
    setKeyword("");

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (status === "ALL") {
        const response = await getAdminOrders();

        setOrders(response.data);
      } else {
        const response =
          await getAdminOrdersByStatus(status);

        setOrders(response.data);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to filter orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      await updateAdminOrderStatus(
        orderId,
        status
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );

      setSuccess(
        `Order #${orderId} status updated to ${status}.`
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-indigo-100 text-indigo-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor and manage marketplace orders.
        </p>
      </div>

      {/* Search + Recent */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            onSubmit={handleSearch}
            className="flex flex-1 flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              placeholder="Search by order ID, customer..."
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                setKeyword("");
                setSelectedStatus("ALL");
                loadOrders();
              }}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Reset
            </button>
          </form>

          <button
            type="button"
            onClick={loadRecentOrders}
            className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Recent Orders
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() =>
              handleStatusFilter(status)
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              selectedStatus === status
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {status === "ALL"
              ? "All"
              : status.charAt(0) +
                status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Update
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Order */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        #{order.id}
                      </p>

                      {order.orderNumber && (
                        <p className="text-xs text-gray-400">
                          {order.orderNumber}
                        </p>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {order.customerName ||
                          order.userName ||
                          "—"}
                      </p>

                      {order.customerEmail && (
                        <p className="text-xs text-gray-500">
                          {order.customerEmail}
                        </p>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ₹{formatAmount(order.totalAmount)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(
                        order.createdAt ||
                          order.orderDate
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Update */}
                    <td className="px-6 py-4 text-right">
                      <select
                        value={order.status || ""}
                        disabled={
                          updatingId === order.id
                        }
                        onChange={(e) =>
                          handleUpdateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.filter(
                          (status) =>
                            status !== "ALL"
                        ).map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {orders.length} order
          {orders.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default Orders;