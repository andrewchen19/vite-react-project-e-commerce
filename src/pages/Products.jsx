import { Filter, ProductsContainer } from "../components";
import axios from "axios";
import { getAllProducts } from "../features/filter/filterSlice";

const url = "https://www.course-api.com/react-store-products";

// object
const allProductsQuery = {
  queryKey: ["allProducts"],
  queryFn: () => axios.get(url),
};

export const loader = (store, queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(allProductsQuery);
    // console.log(response);

    const data = response.data;

    store.dispatch(getAllProducts(data));

    return { data };
  } catch (error) {
    return null;
  }
};

const Products = () => {
  return (
    <main className="align-element py-10 grid gap-y-12 md:grid-cols-[200px,1fr] md:gap-x-6">
      <Filter />
      <div>
        <ProductsContainer />
      </div>
    </main>
  );
};

export default Products;
