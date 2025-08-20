import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { fetchCartThunk } from "../features/cartSlice";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-[#f6f6f6] min-h-[calc(100vh-48px)]">
      {orderSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg text-lg font-semibold animate-fade-in-out">
          Đặt hàng thành công!
        </div>
      )}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 py-8">
        {/* Bag section */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-4xl font-light mb-6">Bag</h2>
          {items.length === 0 ? (
            <div className="text-lg mt-2">There are no items in your bag.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
        {/* Summary section */}
        <div className="w-full md:w-[400px] max-w-full md:max-w-[400px] bg-white rounded-md p-8 shadow-none border-none">
          <h2 className="text-4xl font-light mb-6">Summary</h2>
          <div className="flex justify-between items-center mb-2 text-base">
            <span>
              Subtotal{" "}
              <span
                className="inline-block align-middle ml-1 cursor-pointer"
                title="Subtotal is the sum of item prices before delivery."
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="inline"
                >
                  <circle cx="12" cy="12" r="10" />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    ?
                  </text>
                </svg>
              </span>
            </span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between items-center mb-2 text-base">
            <span>Estimated Delivery &amp; Handling</span>
            <span>Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mb-4 text-lg font-medium">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            className={`w-full py-4 rounded-full text-lg font-medium transition ${
              items.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
