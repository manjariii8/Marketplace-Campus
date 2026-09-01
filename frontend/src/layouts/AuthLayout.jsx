import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main className="min-h-screen bg-slate-100">
            <Outlet />
        </main>
    );
};

export default AuthLayout;