import ProtectedRoute from "./ProtectedRoute";

const CustomerRoute = () => (
  <ProtectedRoute allowedRoles={["CUSTOMER"]} />
);

export default CustomerRoute;