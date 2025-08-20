import { useDispatch } from "react-redux";
import {
  removeFromCartThunk,
  updateCartItemThunk,
  updateLocalQuantity,
} from "../features/cartSlice";

import { useRef } from "react";

import { useState } from "react";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const product = item.product || {};
  const cartId = item.id?.cartId;
  const productId = item.id?.productId || product.id;

  // State cục bộ cho quantity để cập nhật UI ngay
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const debounceRef = useRef();

  const updateQuantityDebounced = (newQuantity) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(
        updateCartItemThunk({ cartId, productId, quantity: newQuantity })
      );
    }, 2000);
  };

  const handleIncrease = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    dispatch(updateLocalQuantity({ cartId, productId, quantity: newQuantity }));
    updateQuantityDebounced(newQuantity);
  };

  const handleDecrease = () => {
    if (localQuantity <= 1) return;
    const newQuantity = localQuantity - 1;
    setLocalQuantity(newQuantity);
    dispatch(updateLocalQuantity({ cartId, productId, quantity: newQuantity }));
    updateQuantityDebounced(newQuantity);
  };

  return (
    <li className="flex items-center gap-4 py-4">
      <div className="flex-shrink-0">
        <img
          src={product.imageUrl || "/no-image.png"}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg border bg-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/no-image.png";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-lg text-gray-900 truncate">
          {product.name}
        </div>
        <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-2">
          {item.size && (
            <span>
              Size:{" "}
              <span className="font-semibold text-gray-700">{item.size}</span>
            </span>
          )}
          {item.color && (
            <span>
              Color:{" "}
              <span className="font-semibold text-gray-700">{item.color}</span>
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Đơn giá:{" "}
          <span className="font-semibold text-gray-700">${product.price}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 min-w-[90px]">
        <div className="text-base font-bold text-gray-900">
          ${product.price * item.quantity}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {localQuantity === 1 ? (
            <>
              <button
                className="py-2 px-3 rounded hover:bg-gray-100 text-black"
                title="Xóa khỏi giỏ hàng"
                onClick={() =>
                  dispatch(removeFromCartThunk({ cartId, productId }))
                }
              >
                <svg
                  width="28"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18M9 6v12a2 2 0 002 2h2a2 2 0 002-2V6m-6 0V4a2 2 0 012-2h2a2 2 0 012 2v2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11v6M14 11v6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="p-2 rounded hover:bg-gray-100 text-black border border-gray-300"
                title="Tăng số lượng"
                onClick={handleIncrease}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                className="p-2 rounded hover:bg-gray-100 text-black border border-gray-300"
                title="Giảm số lượng"
                onClick={handleDecrease}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="px-2 font-semibold">{localQuantity}</span>
              <button
                className="p-2 rounded hover:bg-gray-100 text-black border border-gray-300"
                title="Tăng số lượng"
                onClick={handleIncrease}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
