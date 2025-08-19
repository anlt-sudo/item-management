import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col">
    <img src={product.imageUrl} alt={product.name} className="h-40 object-cover mb-2 rounded" />
    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
    <p className="text-gray-600 mb-2">{product.description}</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="font-bold text-blue-600">${product.price}</span>
      <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View</Link>
    </div>
  </div>
);

export default ProductCard;
