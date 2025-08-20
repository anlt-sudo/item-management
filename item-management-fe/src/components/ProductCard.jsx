import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[420px] md:min-h-[420px] transition-all duration-200 border-2 border-transparent hover:border-black hover:shadow-2xl hover:scale-[1.03] group cursor-pointer">
    <div className="relative w-full mb-2 overflow-hidden rounded-lg">
        <img src={product.imageUrl} alt={product.name}
          className="w-full h-[45vh] md:h-[55vh] object-cover rounded-lg group-hover:opacity-90 group-hover:scale-105 transition-all duration-200" />
    </div>
    <Link to={`/product/${product.id}`}> 
      <h3 className="font-semibold text-lg mb-1 group-hover:text-black transition">{product.name}</h3>
      <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold">${product.price}</span>
      </div>
    </Link>
  </div>
);

export default ProductCard;
