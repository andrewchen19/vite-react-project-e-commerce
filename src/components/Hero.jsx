import { NavLink } from "react-router-dom";
import hero1 from "../assets/hero1.jpg";

const Hero = () => {
  return (
    <section className="align-element py-20 grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-wide uppercase">
          design your <br />
          comfort zone
        </h1>
        <p className="max-w-[700px] leading-7 text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem alias
          dicta animi at laboriosam quia accusamus maxime, incidunt praesentium?
          Illum quam magnam aspernatur dolorem, eveniet facere, maiores
          molestias placeat quo cum veniam repellat natus! Qui consequatur quam
          quae. Sequi corporis minima ipsam unde numquam quam, eveniet nulla
          voluptatibus dolorem maxime.
        </p>
        <div>
          <NavLink
            to="/products"
            className="btn btn-secondary tracking-wide btn-sm lg:btn-md"
          >
            shop now
          </NavLink>
        </div>
      </div>

      <div className="hidden lg:block">
        <img
          src={hero1}
          alt="hero picture"
          className="w-[80%] h-[550px] object-cover object-center mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
