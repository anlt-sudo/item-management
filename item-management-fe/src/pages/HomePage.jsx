import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsThunk } from "../features/productSlice";
import Spinner from "../components/ui/Spinner";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import { fetchUserProfileThunk } from "../features/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfileThunk());
    }
    dispatch(fetchAllProductsThunk());
  }, [dispatch, token]);

  const [current, setCurrent] = useState(0);
  const total = products.length;

  // Tự động trượt slide
  useEffect(() => {
    if (total < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [total]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <HeroBanner />
      <CategorySection />
      <div className="px-4 pt-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          Popular Items
        </h2>
        <div className="relative flex items-center justify-center min-h-[80vh]">
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-white/80 hover:bg-gray-200 rounded-full p-3 shadow-lg top-1/2 -translate-y-1/2"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-full flex items-center justify-center gap-2 md:gap-8 relative">
            {/* Sản phẩm bên trái */}
            <div className="hidden md:flex flex-col items-center justify-center w-[220px] opacity-40 scale-90 blur-sm pointer-events-none select-none transition-all duration-300">
              {products.length > 1 && (
                <ProductCard
                  product={products[(current - 1 + total) % total]}
                />
              )}
            </div>
            {/* Sản phẩm chính */}
            <div className="flex-1 flex items-center justify-center min-w-0">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={products[current]?.id || current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  {products[current] && (
                    <ProductCard product={products[current]} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Sản phẩm bên phải */}
            <div className="hidden md:flex flex-col items-center justify-center w-[220px] opacity-40 scale-90 blur-sm pointer-events-none select-none transition-all duration-300">
              {products.length > 1 && (
                <ProductCard product={products[(current + 1) % total]} />
              )}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-white/80 hover:bg-gray-200 rounded-full p-3 shadow-lg top-1/2 -translate-y-1/2"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-black" : "bg-gray-300"
              } transition`}
              aria-label={`Chọn sản phẩm ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
