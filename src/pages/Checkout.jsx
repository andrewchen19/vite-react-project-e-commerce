import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { CartTotals, SectionTitle } from "../components";
import { updateOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  // restrict access
  if (!isUser) {
    return <Navigate to="/" />;
  }

  const { cartItems, cartTotalAmount, orderTotalPrice } = useSelector(
    (store) => store.cart
  );
  // conditional render
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // utility function
  const submitHandler = (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const data = {
      firstName,
      lastName,
      city,
      country,
      cartTotalAmount,
      orderTotalPrice,
      // 將其變為可序列化的數據
      time: new Date().toISOString(),
    };

    dispatch(updateOrder(data));
    dispatch(clearCart());
    toast.success("order placed successfully", {
      icon: "😎",
    });

    navigate("/order");
  };

  return (
    <div className="align-element py-20">
      <SectionTitle text="checkout details" />
      <div className="mt-8 grid gap-y-8 lg:grid-cols-[1fr,1fr] lg:gap-x-14 items-end">
        <div>
          <h3 className="mb-2 capitalize text-xl tracking-wide">
            Shipping information
          </h3>

          <form onSubmit={submitHandler}>
            {/* first name & last name */}
            <div className="mb-3 flex gap-x-12">
              <div>
                <label className="label" htmlFor="firstName">
                  <span className="label-text capitalize">first name</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="py-1 pl-2 bg-base-200 rounded-md tracking-wide"
                />
              </div>

              <div>
                <label className="label" htmlFor="lastName">
                  <span className="label-text capitalize">last name</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="py-1 pl-2 bg-base-200 rounded-md tracking-wide"
                />
              </div>
            </div>

            {/* city & country */}
            <div className="mb-3 flex gap-x-12">
              <div>
                <label className="label" htmlFor="city">
                  <span className="label-text capitalize">city</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="py-1 pl-2 bg-base-200 rounded-md tracking-wide"
                />
              </div>

              <div>
                <label className="label" htmlFor="country">
                  <span className="label-text capitalize">country</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  className="py-1 pl-2 bg-base-200 rounded-md tracking-wide"
                />
              </div>
            </div>

            {/* button */}
            <button
              type="submit"
              className="mt-8 btn btn-sm btn-neutral btn-block max-w-[407px]"
            >
              place order
            </button>
          </form>
        </div>

        <div>
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
