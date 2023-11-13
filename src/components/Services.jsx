import { services } from "../utilize";

const Services = () => {
  return (
    <section className="px-8 py-12 bg-accent">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl tracking-wide font-semibold">
          Custom Furniture <br /> Built Only For You
        </h2>
      </div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const { id, icon, title, text } = service;
          return (
            <article
              key={id}
              className="p-4 flex flex-col items-center text-center gap-4 bg-base-100 rounded-xl"
            >
              <div className="w-12 h-12 rounded-full bg-accent text-2xl grid place-items-center text-base-100">
                {icon}
              </div>
              <h4 className="capitalize text-2xl font-semibold tracking-wide text-primary-focus">
                {title}
              </h4>
              <p className="leading-7 text-gray-500">{text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
