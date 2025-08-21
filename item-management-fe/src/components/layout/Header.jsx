import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { Link } from "react-router-dom";
import { fetchCartThunk } from "../../features/cartSlice";
import SearchDropdown from "../SearchDropdown";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Tổng số lượng sản phẩm trong cart
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
  );
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-around px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-1 min-w-0">
          <img src="/logo-nike-revert.png" alt="Logo" className="h-10 w-10" />
          <span className="font-black text-3xl tracking-tight text-gray-900">
            EKIN
          </span>
        </Link>

        {/* Center menu */}
        <nav className="flex-1 flex justify-center gap-10 text-base font-bold text-gray-700 max-md:hidden">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-black transition">
            Products
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex-1 flex justify-end items-center gap-6">
          {/* Search icon */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
            <SearchDropdown
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
            />
          </div>
          {/* User icon or dropdown - chỉ hiển thị khi login */}
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                className="p-2 hover:bg-gray-100 rounded-full flex items-center"
                aria-label="User menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z"
                  />
                </svg>
                <span className="ml-2 font-semibold hidden sm:inline text-base">
                  {user?.name || "User"}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg min-w-[200px] z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user?.role === "ADMIN" && (
                    <>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/products"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Product Management
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Order Management
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      dispatch(logout());
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
          {/* Cart icon */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.5 15.75A2.25 2.25 0 009.664 18h4.672a2.25 2.25 0 002.164-2.25l1.344-9.477m-12.75 0h12.75"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
