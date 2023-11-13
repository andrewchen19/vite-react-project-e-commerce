import NavLinks from "./NavLinks";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa6";
import {
  BsCart3,
  BsPersonPlusFill,
  BsPersonDashFill,
  BsSunFill,
  BsMoonFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { toggleTheme } from "../features/themes/themesSlice";
import { clearOrder } from "../features/order/orderSlice";

const Navbar = () => {
  const { theme } = useSelector((store) => store.themes);
  const isLight = theme === "myLight";

  const { cartTotalAmount } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  const logoutHandler = () => {
    dispatch(clearOrder());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <section className="bg-base-200">
      <div className="align-element navbar">
        <div className="navbar-start">
          {/* logo */}
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="hidden lg:block lg:w-32 lg:h-16"
            />
          </NavLink>
          {/* dropdown */}
          <div className="dropdown dropdown-start lg:hidden">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <FaBars className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end flex gap-x-4">
          {/* theme */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={() => dispatch(toggleTheme())}
              defaultChecked={isLight}
            />
            <BsSunFill className="swap-on fill-current w-6 h-6" />
            <BsMoonFill className="swap-off fill-current w-6 h-6" />
          </label>
          {/* cart */}
          <NavLink
            to="/cart"
            className="btn btn-sm lg:btn-md btn-ghost btn-circle"
          >
            <div className="indicator">
              <span className="indicator-item badge badge-neutral">
                {cartTotalAmount}
              </span>
              <BsCart3 className="w-6 h-6" />
            </div>
          </NavLink>
          {/* logout & login */}
          {isUser ? (
            <button
              className="btn btn-sm lg:btn-md btn-ghost btn-circle"
              onClick={logoutHandler}
            >
              <div className="indicator">
                <BsPersonDashFill className="w-6 h-6" />
              </div>
            </button>
          ) : (
            <button
              className="btn btn-sm lg:btn-md btn-ghost btn-circle"
              onClick={loginWithRedirect}
            >
              <div className="indicator">
                <BsPersonPlusFill className="w-6 h-6" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
