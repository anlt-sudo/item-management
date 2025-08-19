import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  return isAuthenticated && role === 'ADMIN' ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
