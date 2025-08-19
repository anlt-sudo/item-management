import { Link } from 'react-router-dom';

const AdminSidebar = () => (
  <aside className="w-64 bg-gray-100 h-full p-4">
    <nav className="flex flex-col gap-4">
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link>
    </nav>
  </aside>
);

export default AdminSidebar;
