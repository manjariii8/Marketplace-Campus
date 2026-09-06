import { useEffect, useState } from "react";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  IndianRupee,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyProducts } from "../../services/productService";

const DashboardCard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getMyProducts();

      setProducts(response.data || []);
    } catch (error) {
      console.error("Unable to load seller statistics:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // CALCULATE STATISTICS
  // =========================

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.active === true
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock || 0) <= 0
  ).length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) * Number(product.stock || 0),
    0
  );

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Products listed by you",
      icon: Package,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Products",
      value: activeProducts,
      description: "Currently visible in store",
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      description: "Products need restocking",
      icon: AlertTriangle,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Inventory Value",
      value: `₹${totalInventoryValue.toLocaleString("en-IN")}`,
      description: `${totalStock.toLocaleString("en-IN")} units in stock`,
      icon: IndianRupee,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="space-y-5">
        {/* Action Skeleton */}

        <div className="flex justify-end gap-3">
          <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
        </div>

        {/* Cards Skeleton */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* =========================
          ACTION BUTTONS
      ========================= */}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={loadProducts}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <RefreshCw size={16} />
          Refresh Stats
        </button>

        <button
          type="button"
          onClick={() => navigate("/seller/products/add")}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* =========================
          DASHBOARD CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon size={23} />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                  {card.value}
                </h3>

                <p className="mt-1.5 text-xs text-slate-500">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCard;