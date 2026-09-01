import DashboardCard from "../components/seller/DashboardCard";
import DashboardHeader from "../components/seller/DashboardHeader";
import ProductTable from "../components/seller/ProductTable";

const SellerDashboard = () => {

  return (
    <div className="min-h-screen bg-slate-100">

      <main className="mx-auto max-w-[1600px] p-6 lg:p-8">

        {/* Header */}

        <DashboardHeader />

        {/* Statistics */}

        <div className="mt-8">
          <DashboardCard />
        </div>

        {/* Products */}

        <div className="mt-8">

          <ProductTable />

        </div>

      </main>

    </div>
  );
};

export default SellerDashboard;