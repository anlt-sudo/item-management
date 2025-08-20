const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onAddToCart,
}) => (
  <div>
    <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
    <div className="text-2xl text-black font-semibold mb-4">
      $ {product?.price?.toLocaleString()}
    </div>
    <div className="mb-4">
      <span className="font-semibold">Chọn size:</span>
      <div className="flex gap-2 mt-2 flex-wrap">
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 rounded border ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
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
    <button
      onClick={onAddToCart}
      className="w-full py-3 text-lg font-bold mt-2 bg-black text-white shadow-md hover:bg-gray-200 hover:text-black hover:shadow-xl transition-colors duration-200 border border-black"
      style={{
        backgroundColor: "black",
        color: "white",
        hover: { backgroundColor: "white", color: "black" },
      }}
    >
      Thêm vào giỏ hàng
    </button>
    <div>
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Mô tả sản phẩm</h3>
        <p className="text-gray-700 whitespace-pre-line">
          {product?.description}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Thông tin chi tiết</h3>
        <p className="text-gray-700 whitespace-pre-line">{product.details}</p>
      </div>
    </div>
  </div>
);

export default ProductInfo;
