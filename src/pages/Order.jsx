import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { formatPrice, formatTime } from "../utilize";

const Order = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  // restrict access
  if (!isUser) {
    return <Navigate to="/" />;
  }

  const { orderItems } = useSelector((store) => store.order);
  console.log(orderItems);

  // conditional render
  if (orderItems.length < 1) {
    return (
      <div className="align-element py-20">
        <SectionTitle text="please make an order" />
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
      <SectionTitle text="your orders" />

      <section className="mt-8 grid gap-y-2">
        <h3 className="capitalize text-xl tracking-wide">
          total orders: {orderItems.length}
        </h3>

        <div className="mt-6 overflow-x-auto">
          <table className="table table-sm table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Products</th>
                <th>Cost</th>
                <th className="hidden sm:block">Date</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order, index) => {
                const {
                  firstName,
                  lastName,
                  city,
                  country,
                  cartTotalAmount,
                  orderTotalPrice,
                  time,
                } = order;
                return (
                  <tr key={index}>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>
                      {city},{country}
                    </td>
                    <td>{cartTotalAmount}</td>
                    <td>{formatPrice(orderTotalPrice)}</td>
                    <td className="hidden sm:block">{formatTime(time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Order;
