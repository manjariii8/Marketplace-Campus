import { Outlet } from "react-router-dom";

import AdminSidebar from "../admin/components/AdminSidebar";
import AdminNavbar from "../admin/components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="ml-64 min-h-screen">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;