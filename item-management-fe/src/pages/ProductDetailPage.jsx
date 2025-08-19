import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdThunk } from '../features/productSlice';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { addToCart } from '../features/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProductByIdThunk(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <div className="font-bold text-blue-600 text-lg mb-4">${product.price}</div>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductDetailPage;
