import { Link, NavLink } from "react-router-dom";
import {FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiHeart,
} from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-blue-600">
          MarketPlace
        </Link>

        <div className="hidden lg:flex relative w-[420px]">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/seller">Seller</NavLink>

          <NavLink to="/orders">Orders</NavLink>
        </nav>

        <div className="flex gap-5 items-center">
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            <FiShoppingCart size={22} />
          </Link>
          <Link to="/wishlist">
            <FiHeart size={22} />
          </Link>

          <button>
            <FiUser size={22} />
          </button>

          <button className="lg:hidden">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
