import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsThunk } from "../features/productSlice";
import Spinner from "../components/ui/Spinner";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
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

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <HeroBanner />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
        id="products"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
