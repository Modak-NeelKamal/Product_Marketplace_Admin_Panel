import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import ProductListings from '../pages/ProductListings';
import ProductDetails from '../pages/ProductDetails';
import Users from '../pages/Users';
import UserDetails from '../pages/UserDetails';
import Transactions from '../pages/Transactions';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductListings />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;