import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-8 py-10 text-white">

            <div className="flex items-center gap-5">

              {/* Profile Icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <FiUser size={38} />
              </div>

              {/* Header Text */}
              <div>
                <h1 className="text-3xl font-bold">
                  My Profile
                </h1>

                <p className="mt-1 text-blue-100">
                  Manage your account information
                </p>
              </div>

            </div>

          </div>

          {/* Content */}
          <div className="p-8">

            {/* User Summary Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">

                {/* User Initial */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* User Details */}
                <div className="min-w-0">

                  <h2 className="text-xl font-bold text-gray-900">
                    {user?.name || "User"}
                  </h2>

                  <p className="break-all text-gray-500">
                    {user?.email || "Not available"}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                    {(user?.role || "Customer").toString().toLowerCase()}
                  </span>

                </div>

              </div>

            </div>

            {/* Account Information */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Name */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <p className="text-sm font-medium text-slate-500">
                  Name
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-800">
                  {user?.name || "User"}
                </p>

              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <p className="text-sm font-medium text-slate-500">
                  Email
                </p>

                <p className="mt-2 break-all text-lg font-semibold text-slate-800">
                  {user?.email || "Not available"}
                </p>

              </div>

              {/* Account Type */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <p className="text-sm font-medium text-slate-500">
                  Account Type
                </p>

                <p className="mt-2 text-lg font-semibold capitalize text-slate-800">
                  {(user?.role || "Customer").toString().toLowerCase()}
                </p>

              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/orders"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                My Orders
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Continue Shopping
              </Link>

            </div>

            {/* Logout Section */}
            <div className="mt-8 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Logout Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sign out
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Sign out of your marketplace account on this device.
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
