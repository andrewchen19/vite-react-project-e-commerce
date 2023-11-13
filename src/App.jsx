import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  Layout,
  Products,
  SingleProduct,
  SingleError,
  Order,
} from "./pages";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (1000 * 60),
      cacheTime: 5 * (1000 * 60),
    },
  },
});
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// loaders
import { loader as homeLoader } from "./components/FeaturedProducts";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
// store
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // global error
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader(queryClient),
        errorElement: <SingleError />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader(store, queryClient),
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order",
        element: <Order />,
        // loader: checkoutLoader(store),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
