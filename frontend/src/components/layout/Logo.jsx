import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
        <ShoppingBag size={22} />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Marketplace
        </h1>

        <p className="text-xs text-slate-500">
          Buy • Sell • Discover
        </p>
      </div>
    </Link>
  );
};

export default Logo;