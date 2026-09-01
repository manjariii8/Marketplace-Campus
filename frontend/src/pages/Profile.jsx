import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-8 py-10 text-white">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <FiUser size={38} />
              </div>

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

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">
                  Name
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-800">
                  {user?.name || "User"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">
                  Email
                </p>

                <p className="mt-2 break-all text-lg font-semibold text-slate-800">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">
                  Account Type
                </p>

                <p className="mt-2 text-lg font-semibold capitalize text-slate-800">
                  {(user?.role || "Customer").toString().toLowerCase()}
                </p>
              </div>

            </div>

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

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;