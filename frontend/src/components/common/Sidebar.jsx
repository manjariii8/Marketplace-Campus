import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
} from "lucide-react";

const Sidebar = ({ role }) => {
  const sellerLinks = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/seller",
    },
    {
      icon: Package,
      title: "Products",
      path: "/seller/products",
    },
    {
      icon: ShoppingCart,
      title: "Orders",
      path: "/seller/orders",
    },
  ];

  const adminLinks = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/admin",
    },
    {
      icon: Users,
      title: "Users",
      path: "/admin/users",
    },
    {
      icon: FolderTree,
      title: "Categories",
      path: "/admin/categories",
    },
    {
      icon: Package,
      title: "Products",
      path: "/admin/products",
    },
  ];

  const links = role === "admin" ? adminLinks : sellerLinks;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="border-b border-slate-700 p-6 text-2xl font-bold">
        {role === "admin" ? "Admin Panel" : "Seller Panel"}
      </div>

      <nav className="p-4 space-y-2">
        {links.map(({ icon: Icon, title, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <Icon size={18} />
            {title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;