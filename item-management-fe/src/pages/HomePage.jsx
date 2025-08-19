
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsThunk } from '../features/productSlice';
import Spinner from '../components/ui/Spinner';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <HeroBanner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4" id="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
