import { Outlet } from "react-router-dom";

import AdminSidebar from "../admin/components/AdminSidebar";

const AdminLayout = () => {

    return (

        <div className="flex min-h-screen bg-slate-100">

            <AdminSidebar />

            <main className="flex-1 p-8">

                <Outlet />

            </main>

        </div>

    );

};

export default AdminLayout;