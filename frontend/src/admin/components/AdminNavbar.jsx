import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex min-h-[88px] items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm lg:px-8">

      {/* Dashboard Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your marketplace from one place
        </p>
      </div>

      {/* Admin Section */}
      <div className="flex items-center gap-5">

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-sm">
            {initial}
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm text-slate-500">
              Administrator
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
        >
          <span className="text-lg">↪</span>

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>
    </header>
  );
};

export default AdminNavbar;