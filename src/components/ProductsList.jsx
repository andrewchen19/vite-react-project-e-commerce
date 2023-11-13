import { NavLink } from "react-router-dom";
import { formatPrice } from "../utilize";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const { filtered_products: products } = useSelector((store) => store.filter);

  return (
    <div className="mt-12 grid gap-y-6">
      {products.map((item) => {
        const { id, image, name, price, description } = item;
        const dollarAmount = formatPrice(price);

        // to={`/products/${id}`}

        return (
          <article
            key={id}
            className="grid lg:grid-cols-[auto,1fr] gap-x-8 gap-y-4 items-center"
          >
            <figure>
              <img
                src={image}
                alt={name}
                className="w-[18rem] h-56 object-cover object-center rounded-lg"
              />
            </figure>

            <div>
              <h2 className="capitalize tracking-wide font-bold lg:text-lg">
                {name}
              </h2>
              <div className="mt-2 text-neutral-focus lg:text-lg">
                {dollarAmount}
              </div>
              <p className="mt-2 text-gray-500 max-w-[25rem]">
                {description.slice(0, 129)} ...
              </p>
              <NavLink
                key={id}
                to={`/products/${id}`}
                className="mt-3 btn btn-xs md:btn-sm tracking-wide btn-secondary"
              >
                Details
              </NavLink>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsList;
