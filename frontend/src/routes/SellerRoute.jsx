import ProtectedRoute from "./ProtectedRoute";

const SellerRoute = () => (
  <ProtectedRoute allowedRoles={["SELLER"]} />
);

export default SellerRoute;