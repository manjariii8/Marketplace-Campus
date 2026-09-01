import { useEffect, useMemo, useState } from "react";
import {
  getAdminDashboard,
  getAdminOrders,
} from "../services/adminService";

const Analytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, ordersResponse] =
        await Promise.all([
          getAdminDashboard(),
          getAdminOrders(),
        ]);

      setDashboard(dashboardResponse.data);
      setOrders(ordersResponse.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  const statistics = useMemo(() => {
    const totalOrders = orders.length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "DELIVERED"
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.status === "PENDING"
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "CANCELLED"
    ).length;

    const processingOrders = orders.filter(
      (order) =>
        order.status === "PROCESSING" ||
        order.status === "CONFIRMED" ||
        order.status === "SHIPPED"
    ).length;

    const calculatedRevenue = orders
      .filter(
        (order) =>
          order.status === "DELIVERED"
      )
      .reduce(
        (total, order) =>
          total +
          Number(order.totalAmount || 0),
        0
      );

    return {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      cancelledOrders,
      processingOrders,
      calculatedRevenue,
    };
  }, [orders]);

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const getPercentage = (value) => {
    if (!statistics.totalOrders) {
      return 0;
    }

    return Math.round(
      (value / statistics.totalOrders) * 100
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor marketplace performance and order activity.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {statistics.totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Delivered
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {statistics.deliveredOrders}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {getPercentage(
              statistics.deliveredOrders
            )}
            % of orders
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Processing
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-600">
            {statistics.processingOrders}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {getPercentage(
              statistics.processingOrders
            )}
            % of orders
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Cancelled
          </p>

          <h2 className="mt-3 text-3xl font-bold text-red-600">
            {statistics.cancelledOrders}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {getPercentage(
              statistics.cancelledOrders
            )}
            % of orders
          </p>
        </div>

      </div>

      {/* Revenue */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Dashboard Revenue
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            ₹
            {formatCurrency(
              dashboard?.totalRevenue
            )}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Revenue reported by the backend.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Delivered Order Revenue
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            ₹
            {formatCurrency(
              statistics.calculatedRevenue
            )}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Calculated from delivered orders.
          </p>
        </div>

      </div>

      {/* Order Distribution */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Order Distribution
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current distribution of marketplace orders.
          </p>
        </div>

        <div className="space-y-5">

          <ProgressRow
            label="Delivered"
            value={statistics.deliveredOrders}
            percentage={getPercentage(
              statistics.deliveredOrders
            )}
          />

          <ProgressRow
            label="Processing"
            value={statistics.processingOrders}
            percentage={getPercentage(
              statistics.processingOrders
            )}
          />

          <ProgressRow
            label="Pending"
            value={statistics.pendingOrders}
            percentage={getPercentage(
              statistics.pendingOrders
            )}
          />

          <ProgressRow
            label="Cancelled"
            value={statistics.cancelledOrders}
            percentage={getPercentage(
              statistics.cancelledOrders
            )}
          />

        </div>
      </div>

      {/* Marketplace Overview */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-gray-900">
          Marketplace Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current platform statistics.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <OverviewItem
            label="Users"
            value={dashboard?.totalUsers ?? 0}
          />

          <OverviewItem
            label="Customers"
            value={dashboard?.totalCustomers ?? 0}
          />

          <OverviewItem
            label="Sellers"
            value={dashboard?.totalSellers ?? 0}
          />

          <OverviewItem
            label="Products"
            value={dashboard?.totalProducts ?? 0}
          />

        </div>
      </div>
    </div>
  );
};

const ProgressRow = ({
  label,
  value,
  percentage,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>

        <span className="text-sm text-gray-500">
          {value} ({percentage}%)
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

const OverviewItem = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-gray-50 p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default Analytics;