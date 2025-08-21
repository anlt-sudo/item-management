import { Link } from "react-router-dom";

// size: "large" (HomePage), "normal" (ListProductPage)
const ProductCard = ({ product, size = "normal" }) => {
  const sizeClass =
    size === "large"
      ? "min-h-[420px] md:min-h-[540px] max-w-[520px] md:max-w-[700px] mx-auto"
      : "min-h-[220px] md:min-h-[220px] max-w-[340px] md:max-w-[380px]";
  const imgClass =
    size === "large" ? "h-[340px] md:h-[420px]" : "h-[160px] md:h-[180px]";

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex flex-col w-full transition-all duration-200 border-2 border-transparent hover:border-black hover:shadow-2xl hover:scale-[1.03] group cursor-pointer ${sizeClass}`}
    >
      <div className="relative w-full mb-2 overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full object-cover rounded-lg group-hover:opacity-90 group-hover:scale-105 transition-all duration-200 ${imgClass}`}
        />
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-semibold text-lg mb-1 group-hover:text-black transition line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold">${product.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
