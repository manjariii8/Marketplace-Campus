import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Users", path: "/admin/users" },
  { name: "Sellers", path: "/admin/sellers" },
  { name: "Products", path: "/admin/products" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Analytics", path: "/admin/analytics" },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white shadow-xl">
      
      {/* Logo */}
      <div className="border-b border-slate-700 px-6 py-6">
        <h2 className="text-2xl font-bold text-blue-400">
          Marketplace
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-1 px-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;