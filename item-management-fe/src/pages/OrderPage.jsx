import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { placeOrder } from "../api/orderApi";
import { placeOrderThunk } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const user = useSelector((state) => state.auth.user) || {};
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item?.product.price * item.quantity,
    0
  );
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    const data = { address };

    dispatch(placeOrderThunk(data))
      .unwrap()
      .then(() => {
        setOrderSuccess(true);
        setTimeout(() => {
          setOrderSuccess(false);
          navigate("/");
        }, 2500);
      })
      .catch((error) => {
        console.error("Order placement failed:", error);
        alert("Failed to place order. Please try again.");
        setOrderSuccess(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Cột trái: Thông tin user + form địa chỉ */}
      <div className="flex-1 bg-white rounded-md p-8 shadow">
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
        <div className="mb-4">
          <div className="font-medium">
            Name: <span className="font-normal">{user.name || "Guest"}</span>
          </div>
          <div className="font-medium">
            Email: <span className="font-normal">{user.email || "N/A"}</span>
          </div>
        </div>
        <form onSubmit={handleOrder}>
          <label className="block mb-2 font-medium">Shipping Address</label>
          <textarea
            className="w-full border rounded p-2 mb-4 min-h-[80px]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your shipping address..."
          />
          <button
            type="submit"
            className="w-full py-3 rounded bg-black text-white font-semibold text-lg hover:bg-gray-900 transition"
            disabled={items.length === 0}
          >
            Place Order
          </button>
        </form>
        {orderSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center font-semibold">
            Order placed successfully!
          </div>
        )}
      </div>
      {/* Cột phải: Thông tin đơn hàng */}
      <div className="w-full md:w-[400px] max-w-full md:max-w-[400px] bg-white rounded-md p-8 shadow">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <img
                src={item?.product?.imageUrl || "/no-image.png"}
                alt={item?.product?.name}
                className="w-12 h-12 object-cover rounded border bg-white"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base text-gray-900 truncate">
                  {item?.product?.name}
                </div>
                <div className="text-xs text-gray-500">x{item?.quantity}</div>
              </div>
              <div className="text-base font-semibold text-gray-900">
                ${item?.product?.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-2 text-base">
          <span>Total</span>
          <span className="font-bold text-lg">${total}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-base">
          <span>Payment Method</span>
          <span className="font-semibold">Cash</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
