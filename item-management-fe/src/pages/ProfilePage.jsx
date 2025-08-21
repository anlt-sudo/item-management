import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfileThunk } from '../features/authSlice';
import { fetchOrdersThunk } from "../features/orderSlice";
import Spinner from "../components/ui/Spinner";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.order
  );

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(orders.length / pageSize);

  // Modal order detail
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // dispatch(fetchUserProfileThunk());
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (userLoading || ordersLoading) return <Spinner />;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Order History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 border border-black">Mã Đơn Hàng</th>
              <th className="p-2 border border-black">Ngày Đặt Hàng</th>
              <th className="p-2 border border-black">Địa Chỉ</th>
              <th className="p-2 border border-black">Tổng tiền</th>
              <th className="p-2 border border-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice((page - 1) * pageSize, page * pageSize)
              .map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-black hover:bg-gray-100"
                >
                  <td className="p-2 border border-black font-semibold">
                    {order.id}
                  </td>
                  <td className="p-2 border border-black">
                    {new Date(order.createDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border border-black">{order.address}</td>
                  <td className="p-2 border border-black">$ {order.total}</td>
                  <td className="p-2 border border-black text-center">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
                      title="Xem chi tiết"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="black"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1.5 12s3.75-7.5 10.5-7.5S22.5 12 22.5 12s-3.75 7.5-10.5 7.5S1.5 12 1.5 12z"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="black"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </button>
                  </td>
                  {/* Modal order details */}
                  {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                          onClick={() => setSelectedOrder(null)}
                          title="Đóng"
                        >
                          &times;
                        </button>
                        <h4 className="text-xl font-bold mb-2">
                          Chi tiết đơn hàng #{selectedOrder.id}
                        </h4>
                        <div className="mb-2 text-sm text-gray-700">
                          <div>
                            <strong>Ngày đặt:</strong>{" "}
                            {selectedOrder.createDate
                              ? new Date(
                                  selectedOrder.createDate
                                ).toLocaleString()
                              : ""}
                          </div>
                          <div>
                            <strong>Địa chỉ:</strong> {selectedOrder.address}
                          </div>
                          <div>
                            <strong>Tổng tiền:</strong> $ {selectedOrder.total}
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full border border-black text-sm mb-2">
                            <thead className="bg-black text-white">
                              <tr>
                                <th className="p-2 border border-black">
                                  Tên sản phẩm
                                </th>
                                <th className="p-2 border border-black">
                                  Số lượng
                                </th>
                                <th className="p-2 border border-black">Giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder.orderDetails?.map((item, idx) => (
                                <tr
                                  key={item.productId || idx}
                                  className="border-b border-black"
                                >
                                  <td className="p-2 border border-black">
                                    {item.productName}
                                  </td>
                                  <td className="p-2 border border-black">
                                    {item.quantity}
                                  </td>
                                  <td className="p-2 border border-black">
                                    $ {item.price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  Chưa có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border border-black rounded bg-white text-black disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 border border-black rounded ${
                page === i + 1 ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-black rounded bg-white text-black disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
