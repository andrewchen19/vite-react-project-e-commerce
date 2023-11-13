import { Form } from "react-router-dom";

const Contact = () => {
  return (
    <section className="align-element py-16">
      <h3 className="mb-4 text-xl lg:text-3xl text-secondary-focus font-semibold tracking-wide">
        Join our newsletter and get 20% off
      </h3>
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
        <p className="max-w-[450px] text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          incidunt dicta quaerat nam suscipit facere sint nulla accusa labore
          culpa!
        </p>
        <Form className="join">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="input input-sm lg:input-md input-bordered input-secondary join-item focus:outline-none"
          />
          <button
            type="submit"
            className="btn btn-sm lg:btn-md btn-secondary border-transparent tracking-wide join-item"
          >
            Subscribe
          </button>
        </Form>
      </div>
    </section>
  );
};

export default Contact;
