import { useSelector } from "react-redux";
import ShowCartItems from "./showCartItems";

const Cart=()=>{
  const cartItems=useSelector((store)=>store.cart.items);
  console.log(cartItems)
  return (
    
     <ShowCartItems cartItems={cartItems}></ShowCartItems>
    

  );
}
export default Cart;