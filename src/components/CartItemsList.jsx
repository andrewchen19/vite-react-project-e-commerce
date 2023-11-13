import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemsList = () => {
  const { cartItems } = useSelector((store) => store.cart);
  // console.log(cartItems);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} item={item} />;
      })}
    </>
  );
};

export default CartItemsList;
