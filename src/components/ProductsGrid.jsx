import { NavLink } from "react-router-dom";
import { formatPrice } from "../utilize";
import { useSelector } from "react-redux";

const ProductsGrid = () => {
  const { filtered_products: products } = useSelector((store) => store.filter);

  return (
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((item) => {
        const { id, image, name, price } = item;
        const dollarAmount = formatPrice(price);

        return (
          <NavLink
            key={id}
            to={`/products/${id}`}
            className="card w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <figure>
              <img
                src={image}
                alt={name}
                className="w-full h-64 md:h-56 object-cover object-center"
              />
            </figure>
            <div className=" card-body bg-base-100 rounded-b-xl">
              <h2 className="capitalize tracking-normal font-bold lg:text-lg">
                {name}
              </h2>
              <span className="mt-4 text-neutral-focus lg:text-lg">
                {dollarAmount}
              </span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
