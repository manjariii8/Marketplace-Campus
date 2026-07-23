import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;