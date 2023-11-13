import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const { cartItems } = useSelector((store) => store.cart);
  // console.log(cartItems);

  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  if (cartItems.length < 1) {
    return (
      <div className="align-element py-20">
        <SectionTitle text="your cart is empty" />
        <div className="mt-12">
          <NavLink
            to="/products"
            className="btn btn-sm lg:btn-md btn-secondary tracking-wide"
          >
            Browse Products
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="align-element py-20">
      <SectionTitle text="shopping cart" />
      <div className="mt-8 grid gap-y-8 lg:grid-cols-[2fr,1fr] lg:gap-x-14 items-start">
        <div>
          <CartItemsList />
        </div>

        <div>
          <CartTotals />
          {isUser ? (
            <NavLink to="/checkout" className="btn btn-neutral btn-block mt-8">
              proceed to checkout
            </NavLink>
          ) : (
            <button
              className="btn btn-neutral btn-block mt-8"
              onClick={loginWithRedirect}
            >
              please login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
