import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { formatPrice } from "../utilize";

const url = "https://www.course-api.com/react-store-products";

// object
const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => axios.get(url),
};

export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    // console.log(response);
    const data = response.data.slice(0, 3);

    return { data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FeaturedProducts = () => {
  const { data } = useLoaderData();
  // console.log(data);

  return (
    <section className="bg-base-200 py-12">
      <div className="align-element">
        <SectionTitle text="Featured Products" />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => {
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
                  <h2 className="card-title capitalize tracking-wide">
                    {name}
                  </h2>
                  <span className="mt-4 text-neutral-focus">
                    {dollarAmount}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
