
import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  // const { items } = location.state || { items: [] }; // Extract items from location state or use empty array as default
  const items = location.state.items; 
  return (
    <div>
      <h2>Cart: {items.length}</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const CartItem = ({ item }) => {
  const { id, name, price } = item;

  return (
    <li key={id}>
      <p>Name: {name}</p>
      <p>Price: ₹{price}</p>
      {/* Add more item details as needed */}
    </li>
  );
};

export default Cart;
