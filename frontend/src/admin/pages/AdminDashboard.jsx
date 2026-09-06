import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getAdminDashboard } from "../services/adminService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminDashboard();

      setDashboard(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-gray-500">
          Loading dashboard...
        </div>
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

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Users"
          value={dashboard?.totalUsers ?? 0}
          description="Registered users"
          icon="👥"
        />

        <StatCard
          title="Customers"
          value={dashboard?.totalCustomers ?? 0}
          description="Active customers"
          icon="🛍️"
        />

        <StatCard
          title="Sellers"
          value={dashboard?.totalSellers ?? 0}
          description="Registered sellers"
          icon="🏪"
        />

        <StatCard
          title="Products"
          value={dashboard?.totalProducts ?? 0}
          description="Listed products"
          icon="📦"
        />

        <StatCard
          title="Orders"
          value={dashboard?.totalOrders ?? 0}
          description="Total orders"
          icon="🧾"
        />

      </div>

      {/* Revenue */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Total Revenue
        </p>

        <h3 className="mt-2 text-4xl font-bold text-gray-900">
          ₹
          {Number(
            dashboard?.totalRevenue ?? 0
          ).toLocaleString("en-IN")}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Revenue from delivered orders
        </p>
      </div>
    </div>
  );
};

export default Dashboard;