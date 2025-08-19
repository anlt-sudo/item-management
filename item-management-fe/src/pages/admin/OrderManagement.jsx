import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersThunk, updateOrderStatusThunk } from '../../features/orderSlice';
import Button from '../../components/ui/Button';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatusThunk({ id, status }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user?.name || 'N/A'}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
