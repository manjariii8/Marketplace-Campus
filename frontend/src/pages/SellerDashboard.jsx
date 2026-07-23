import SellerSidebar from "../components/seller/SellerSidebar";
import DashboardCards from "../components/seller/DashboardCards";
import DashboardHeader from "../components/seller/DashboardHeader";
import ProductTable from "../components/seller/ProductTable";

const SellerDashboard = () => {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <SellerSidebar />

      <main className="flex-1 p-8">
        <DashboardHeader />

        <DashboardCards />

        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Recent Products</h2>

          <p className="text-slate-500">
            We'll connect this table to your backend in the next step.
          </p>
        </div>
        <div className="mt-10">
          <ProductTable />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
