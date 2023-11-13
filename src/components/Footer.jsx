import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 h-20 grid place-items-center">
      <div className="text-center">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-neutral-focus mx-4 font-semibold">
          E-Commerce
        </span>{" "}
        All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
