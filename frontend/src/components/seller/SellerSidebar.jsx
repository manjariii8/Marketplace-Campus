import { NavLink, useNavigate } from "react-router-dom";

import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const menus = [
  {
    title: "Dashboard",
    icon: <FiGrid />,
    path: "/seller",
  },
  {
    title: "Products",
    icon: <FiPackage />,
    path: "/seller/products",
  },
  {
    title: "Orders",
    icon: <FiShoppingBag />,
    path: "/seller/orders",
  },
  {
    title: "Profile",
    icon: <FiUser />,
    path: "/seller/profile",
  },
];

const SellerSidebar = () => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-900 p-6 text-white">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight">
          Seller Panel
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Marketplace Management
        </p>
      </div>

      {/* Seller Information */}
      <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold uppercase">
            {user?.name?.charAt(0) || "S"}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {user?.name || "Seller"}
            </p>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {user?.role || "SELLER"}
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">

        {menus.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            end={menu.path === "/seller"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">
              {menu.icon}
            </span>

            <span>
              {menu.title}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="mt-8 border-t border-slate-700 pt-6">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <FiLogOut className="text-lg" />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
};

export default SellerSidebar;