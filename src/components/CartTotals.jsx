import { useSelector } from "react-redux";
import { formatPrice } from "../utilize";

const CartTotals = () => {
  const { cartTotalPrice, shipping, tax, orderTotalPrice } = useSelector(
    (store) => store.cart
  );

  return (
    <div className="card bg-secondary">
      <div className="card-body text-sm sm:text-base">
        {/* cartTotalPrice */}
        <div className="border-b font-medium border-base-100 pb-2 flex justify-between">
          <p>Subtotal:</p>
          <span>{formatPrice(cartTotalPrice)}</span>
        </div>
        {/* Shipping */}
        <div className="border-b font-medium border-base-100 pb-2 flex justify-between">
          <p>Shipping:</p>
          <span>{formatPrice(shipping)}</span>
        </div>
        {/* Tax */}
        <div className="border-b font-medium border-base-100 pb-2 flex justify-between">
          <p>Tax:</p>
          <span>{formatPrice(tax)}</span>
        </div>
        {/* orderTotalPrice */}
        <div className="mt-6 flex justify-between">
          <p>Order Total:</p>
          <span>{formatPrice(orderTotalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
