import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/seller/SellerSidebar";

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <SellerSidebar />

      <main className="min-w-0 flex-1">

        <div className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default SellerLayout;