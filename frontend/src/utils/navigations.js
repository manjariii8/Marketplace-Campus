import {
  Home,
  ShoppingBag,
  Grid2X2,
  Store,
  Package,
  LayoutDashboard,
} from "lucide-react";

export const NAV_LINKS = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Products",
    path: "/products",
    icon: ShoppingBag,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: Grid2X2,
  },
];

export const USER_MENU = [
  {
    label: "Orders",
    path: "/orders",
    icon: Package,
  },
  {
    label: "Become Seller",
    path: "/seller/register",
    icon: Store,
  },
];

export const SELLER_MENU = [
  {
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/seller/products",
    icon: ShoppingBag,
  },
];

export const ADMIN_MENU = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];