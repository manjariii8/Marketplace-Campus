import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const {
    isAuthenticated,
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin" replace />;

    case "SELLER":
      return <Navigate to="/seller" replace />;

    case "CUSTOMER":
    default:
      return <Navigate to="/" replace />;
  }
};

export default PublicRoute;