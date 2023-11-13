import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import { SingleProductPictures, StarsAndReviews } from "../components";
import { formatPrice } from "../utilize";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const url = "https://www.course-api.com/react-store-single-product?id=";

// utility function
const singleProductQuery = (url, id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => axios.get(`${url}${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id;

    try {
      const response = await queryClient.ensureQueryData(
        singleProductQuery(url, id)
      );
      // console.log(response);

      return { data: response.data };
    } catch (err) {
      console.log(err);

      return null;
    }
  };

const SingleProduct = () => {
  const { data } = useLoaderData();
  // console.log(data);
  const {
    id,
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    company,
    images,
    colors,
  } = data;
  const dollarAmount = formatPrice(price);

  // useState
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const cartProduct = {
    cartID: id + productColor,
    productID: id,
    image: images[0],
    name,
    price,
    company,
    productColor,
    amount,
    stock,
  };

  const dispatch = useDispatch();

  const minusHandler = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      setAmount(1);
    }
  };
  const plusHandler = () => {
    if (amount < stock) {
      setAmount(amount + 1);
    } else {
      setAmount(stock);
    }
  };

  return (
    <section className="align-element py-20">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-16">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="capitalize">{name}</li>
        </ul>
      </div>
      <main className="grid lg:grid-cols-2 items-center gap-12">
        <SingleProductPictures images={images} />
        {/* product detail */}
        <div>
          <h1 className="mb-4 text-3xl lg:text-4xl text-neutral-focus capitalize font-semibold tracking-wide">
            {name}
          </h1>
          {/* stars & reviews */}
          <StarsAndReviews stars={stars} reviews={reviews} />
          <h3 className="mb-4 text-lg lg:text-xl text-secondary-focus tracking-wide">
            {dollarAmount}
          </h3>
          <p className="mb-4 leading-7 text-gray-500">{description}</p>
          {/* available & brand */}
          <div className="grid gap-2 capitalize tracking-wide ">
            <h4>
              {/* inline 元素無法設定 width & hight */}
              <span className="inline-block w-[125px] font-semibold ">
                Available:
              </span>
              {stock > 0 ? "in stock" : "out of stuck"}
            </h4>
            <h4>
              <span className="inline-block w-[125px] font-semibold">SKU:</span>
              {id}
            </h4>
            <h4>
              <span className="inline-block w-[125px] font-semibold">
                Company:
              </span>
              {company}
            </h4>
          </div>

          {/* border line */}
          <div className="mb-4 border-b font-medium border-base-300 pb-4"></div>
          {/* colors */}
          <div className="mb-6 capitalize flex items-center">
            <span className="inline-block w-[125px] font-semibold">colors</span>
            {colors.map((color) => {
              return (
                <button
                  key={color}
                  type="button"
                  className="mr-4 badge w-6 h-6 rounded-full grid place-items-center text-sm text-base-100"
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                >
                  {color === productColor ? <FaCheck /> : null}
                </button>
              );
            })}
          </div>

          {stock > 0 ? (
            <>
              {/* amount */}
              <div className="mb-6 flex items-center gap-x-4">
                <button type="button" onClick={minusHandler}>
                  <FaMinus />
                </button>
                <span className="font-semibold text-2xl text-neutral-focus">
                  {amount}
                </span>
                <button type="button" onClick={plusHandler}>
                  <FaPlus />
                </button>
              </div>
              {/* cart button */}
              <button
                type="button"
                className="btn btn-sm btn-secondary tracking-wide"
                onClick={() => {
                  dispatch(addProduct({ product: cartProduct }));
                  toast.success("Item added to cart", {
                    icon: "🛒",
                  });
                }}
              >
                add to cart
              </button>
            </>
          ) : null}
        </div>
      </main>
    </section>
  );
};

export default SingleProduct;
