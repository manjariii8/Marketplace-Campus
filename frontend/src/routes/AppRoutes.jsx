import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SellerDashboard from "../pages/SellerDashboard";
import ProductDetails from "../pages/ProductDetails";
import Orders from "../pages/Orders";
import SellerProducts from "../pages/SellerProducts";
import SellerOrders from "../pages/SellerOrders";
import SellerProfile from "../pages/SellerProfile";
import AddProduct from "../pages/AddProduct";
import Navbar from "../components/layout/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import EditProduct from "../pages/EditProduct";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/seller/products" element={<SellerProducts />} />

        <Route path="/seller/orders" element={<SellerOrders />} />

        <Route path="/seller/profile" element={<SellerProfile />} />
        <Route path="/seller/products/add" element={<AddProduct />} />
        <Route path="/seller/products/edit/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
