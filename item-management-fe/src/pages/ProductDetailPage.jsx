import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdThunk } from "../features/productSlice";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { addToCart } from "../features/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  // Hard code dữ liệu mẫu nếu thiếu
  const sampleProduct = {
    name: "Nike ReactX Rejuven8",
    price: 3999000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq.png",
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq-2.png",
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq-3.png",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    description:
      "Nike ReactX Rejuven8 là đôi giày mang lại cảm giác êm ái vượt trội, thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày. Đế ReactX mới giúp giảm lực tác động, tăng độ đàn hồi và tiết kiệm năng lượng khi di chuyển. Phần upper thoáng khí, ôm chân, cùng nhiều lựa chọn size phù hợp cho cả nam và nữ. Sản phẩm phù hợp cho chạy bộ, tập gym, đi chơi, đi làm và nhiều hoạt động khác.",
    details:
      "Chất liệu: Vải lưới cao cấp, đế ReactX siêu nhẹ. Công nghệ: Đệm ReactX, upper thoáng khí, chống trơn trượt. Màu sắc: Đen/xám. Bảo hành: 12 tháng. Đổi trả trong 7 ngày nếu lỗi sản xuất.",
  };

  const displayProduct = product && product.image ? product : sampleProduct;

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Vui lòng chọn size!");
    dispatch(addToCart({ ...displayProduct, size: selectedSize, quantity }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl bg-white rounded-xl shadow-lg p-8">
        {/* Ảnh sản phẩm */}
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img
            src={displayProduct.image}
            alt={displayProduct.name}
            className="w-full max-w-md h-[400px] object-cover rounded-xl border"
          />
          <div className="flex gap-2 mt-2">
            {displayProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Phụ ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-blue-500"
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
        {/* Thông tin sản phẩm */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{displayProduct.name}</h2>
            <div className="text-2xl text-blue-600 font-semibold mb-4">
              {displayProduct.price.toLocaleString()}₫
            </div>
            <div className="mb-4">
              <span className="font-semibold">Chọn size:</span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {displayProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Số lượng:</span>
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="ml-2 w-16 px-2 py-1 border rounded"
              />
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full py-3 text-lg font-bold mt-2"
            >
              Thêm vào giỏ hàng
            </Button>
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {displayProduct.description}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">Thông tin chi tiết</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {displayProduct.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
