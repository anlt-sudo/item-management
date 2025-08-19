import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, isAuthenticated, role } = useSelector(state => state.auth);
  return { user, isAuthenticated, role };
};

export default useAuth;
