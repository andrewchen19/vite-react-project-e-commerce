import {
  Hero,
  FeaturedProducts,
  Services,
  Contact,
  Loading,
} from "../components";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isLoading } = useAuth0();

  // redirect users after they have authenticated
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </>
  );
};

export default Home;
