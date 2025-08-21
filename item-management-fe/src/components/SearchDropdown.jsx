import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsThunk } from "../features/productSlice";
import { Link } from "react-router-dom";

export default function SearchDropdown({ open, onClose }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { searchResults, searchLoading } = useSelector(
    (state) => state.product
  );
  const debounceRef = useRef();

  useEffect(() => {
    if (!keyword) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(searchProductsThunk(keyword));
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [keyword, dispatch]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bg-white z-50 p-6"
        >
          <div className="mb-2">
            <input
              autoFocus
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
          <div className="min-h-[60px]">
            {searchLoading ? (
              <div className="flex items-center justify-center py-4">
                <svg
                  className="animate-spin h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </div>
            ) : keyword ? (
              searchResults && searchResults.length > 0 ? (
                <ul>
                  <AnimatePresence>
                    {searchResults.map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.18, delay: idx * 0.04 }}
                        className="py-2 px-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Link
                          to={`/product/${item.id}`}
                          className="flex items-center gap-2"
                          onClick={onClose}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="font-medium">{item.name}</span>
                          <span className="ml-auto text-gray-500 text-sm">
                            ${item.price}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  Không tìm thấy sản phẩm
                </div>
              )
            ) : (
              <div className="text-gray-400 text-center py-4">
                Nhập từ khóa để tìm kiếm
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
