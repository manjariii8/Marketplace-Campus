import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Seller Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your products and monitor your store.
        </p>
      </div>

      <Link
        to="/seller/products/add"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        <FiPlus />
        Add Product
      </Link>
    </div>
  );
};

export default DashboardHeader;