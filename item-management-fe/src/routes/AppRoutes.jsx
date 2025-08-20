import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/ProductManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import OrderPage from "../pages/OrderPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      }
    />
    <Route path="/checkout" element={
      <ProtectedRoute>
        <OrderPage/>
      </ProtectedRoute>
    } />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/products"
      element={
        <AdminRoute>
          <ProductManagement />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/orders"
      element={
        <AdminRoute>
          <OrderManagement />
        </AdminRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
