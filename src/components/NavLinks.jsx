import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "order", text: "order" },
];

const NavLinks = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        // conditional rendering
        if (id >= 5 && !isUser) return null;

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
