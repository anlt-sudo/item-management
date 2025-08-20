import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCartThunk } from "../features/cartSlice";
import { fetchProductByIdThunk } from "../features/productSlice";
import ProductImages from "../components/product/ProductImages";
import ProductInfo from "../components/product/ProductInfo";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdThunk(id));
    }
  }, [dispatch, id]);

  const { product, loading, error } = useSelector((state) => state.product);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  // Hard code dữ liệu mẫu mô tả và chi tiết
  const sampleDescription =
    "Nike ReactX Rejuven8 là đôi giày mang lại cảm giác êm ái vượt trội, thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày. Đế ReactX mới giúp giảm lực tác động, tăng độ đàn hồi và tiết kiệm năng lượng khi di chuyển. Phần upper thoáng khí, ôm chân, cùng nhiều lựa chọn size phù hợp cho cả nam và nữ. Sản phẩm phù hợp cho chạy bộ, tập gym, đi chơi, đi làm và nhiều hoạt động khác.";
  const sampleDetails =
    "Chất liệu: Vải lưới cao cấp, đế ReactX siêu nhẹ. Công nghệ: Đệm ReactX, upper thoáng khí, chống trơn trượt. Màu sắc: Đen/xám. Bảo hành: 12 tháng. Đổi trả trong 7 ngày nếu lỗi sản xuất.";

  // Bổ sung mô tả, details, sizes nếu thiếu từ API
  const defaultSizes = ["38", "39", "40", "41", "42", "43", "44"];
  const defaultImages = [
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq.png",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq-2.png",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/2b2e2c6e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/reactx-rejuven8-shoes-zVR5Bq-3.png",
  ];
  const displayProduct = {
    ...product,
    description: sampleDescription,
    details: product?.details || sampleDetails,
    sizes:
      product?.sizes && product.sizes.length > 0 ? product.sizes : defaultSizes,
    images:
      product?.images && product.images.length > 0
        ? product.images
        : defaultImages,
  };
  // Ảnh chính hiển thị
  const currentMainImage =
    mainImage || displayProduct?.imageUrl || displayProduct.images[0];

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Vui lòng chọn size!");
    dispatch(
      addToCartThunk({
        productId: displayProduct.id,
        quantity,
      })
    );
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-gray-50 flex flex-col items-center justify-center p-0 m-0 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 md:p-8 min-h-[80vh]">
        {/* Ảnh sản phẩm */}
        <div className="flex-1">
          <ProductImages
            images={displayProduct.images}
            mainImage={currentMainImage}
            onImageClick={(img) => setMainImage(img)}
          />
        </div>
        {/* Thông tin sản phẩm */}
        <div className="flex-1 flex flex-col justify-between">
          <ProductInfo
            product={displayProduct}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
