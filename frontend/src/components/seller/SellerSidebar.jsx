import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUser,
  FiLogOut
} from "react-icons/fi";

const menus = [
  { title: "Dashboard", icon: <FiGrid />, path: "/seller" },
  { title: "Products", icon: <FiPackage />, path: "/seller/products" },
  { title: "Orders", icon: <FiShoppingBag />, path: "/seller/orders" },
  { title: "Profile", icon: <FiUser />, path: "/seller/profile" }
];

const SellerSidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-10">
        Seller Panel
      </h2>

      <nav className="space-y-3">

        {menus.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}

      </nav>

      <button className="mt-12 flex items-center gap-3 text-red-400 hover:text-red-300">
        <FiLogOut />
        Logout
      </button>

    </aside>
  );
};

export default SellerSidebar;