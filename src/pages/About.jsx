import about1 from "../assets/about1.jpeg";
import { SectionTitle } from "../components";

const About = () => {
  return (
    <section className="align-element py-20 grid gap-x-12 gap-y-12 lg:grid-cols-2">
      <img
        src={about1}
        alt="about-image"
        className="block w-full h-[500px] object-cover object-center"
      />

      <div>
        <SectionTitle text="our story" />
        <div className="py-8">
          <p className="leading-7 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
            possimus laboriosam deleniti animi voluptatem maiores labore minima,
            saepe autem aliquid quam. Molestias distinctio aut saepe optio
            quaerat officia aspernatur eaque dolorum, quisquam atque, est
            consequatur alias porro impedit reprehenderit veritatis similique
            earum explicabo corporis. Earum quo laudantium repellat sunt totam!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
