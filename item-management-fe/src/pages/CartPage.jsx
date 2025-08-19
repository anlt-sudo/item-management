import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import Button from '../components/ui/Button';

const CartPage = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
                <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg mt-4">Total: ${total}</div>
          <Button className="mt-4" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
