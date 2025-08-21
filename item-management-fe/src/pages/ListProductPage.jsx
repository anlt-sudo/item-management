import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsThunk } from "../features/productSlice";
import ProductCard from "../components/ProductCard";

const PRICE_FILTERS = [
  { label: "Dưới 1.000", min: 0, max: 1000 },
  { label: "1.000 - 10.000", min: 1000, max: 10000 },
  { label: "10.000 - 100.000", min: 10000, max: 100000 },
  { label: "Trên 100.000", min: 100000, max: Infinity },
];

const PRICE_SLIDER_MIN = 0;
const PRICE_SLIDER_MAX = 1000000;

const SORT_OPTIONS = [
  { label: "Giá tăng dần", value: "asc" },
  { label: "Giá giảm dần", value: "desc" },
];

const PAGE_SIZE = 8;

const ListProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [sliderPrice, setSliderPrice] = useState(PRICE_SLIDER_MAX);

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  // Filter by price
  const filtered = products.filter((p) => {
    // Nếu có filter radio thì ưu tiên
    if (selectedPrice) {
      return (
        p.price >= selectedPrice.min &&
        (selectedPrice.max === Infinity || p.price < selectedPrice.max)
      );
    }
    // Nếu không có filter radio, dùng slider
    return p.price <= sliderPrice;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  // Pagination
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePriceChange = (filter) => {
    setSelectedPrice(filter);
    setPage(1);
  };

  const handleSliderChange = (e) => {
    setSliderPrice(Number(e.target.value));
    setSelectedPrice(null); // bỏ chọn radio khi kéo slider
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Filter column */}
      <aside className="w-64 bg-white rounded shadow p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">Lọc theo giá</h2>
        {/* Thanh kéo filter giá */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Chọn giá tối đa:{" "}
            <span className="text-black font-bold">
              $ {sliderPrice.toLocaleString()}
            </span>
          </label>
          <input
            type="range"
            min={PRICE_SLIDER_MIN}
            max={PRICE_SLIDER_MAX}
            value={sliderPrice}
            onChange={handleSliderChange}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>1.000.000</span>
          </div>
        </div>
        <ul className="space-y-2 mb-6">
          {PRICE_FILTERS.map((f) => (
            <li key={f.label}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice?.label === f.label}
                  onChange={() => handlePriceChange(f)}
                />
                {f.label}
              </label>
            </li>
          ))}
        </ul>
        <h2 className="font-bold text-lg mb-2">Sắp xếp</h2>
        <select
          className="w-full border rounded p-2"
          value={sort}
          onChange={handleSortChange}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </aside>
      {/* Product list column */}
      <main className="flex-1">
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Trước
              </button>
              <span>
                Trang {page} / {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Sau
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ListProductPage;
