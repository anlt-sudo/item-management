import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfileThunk } from '../features/authSlice';
import { fetchOrdersThunk } from '../features/orderSlice';
import Spinner from '../components/ui/Spinner';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { orders, loading: ordersLoading } = useSelector(state => state.order);

  useEffect(() => {
    // dispatch(fetchUserProfileThunk());
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (userLoading || ordersLoading) return <Spinner />;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Order History</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="mb-2">
            <div>Order #{order.id} - Status: {order.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
