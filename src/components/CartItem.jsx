import { formatPrice, generateAmountOptions } from "../utilize";
import { deleteProduct, editProduct } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ item }) => {
  const { amount, cartID, company, image, name, price, productColor, stock } =
    item;

  const dispatch = useDispatch();

  const minusHandler = (e) => {
    dispatch(editProduct({ cartID, amount, value: "minus", stock }));
  };

  const plusHandler = (e) => {
    dispatch(editProduct({ cartID, amount, value: "plus", stock }));
  };

  const removeHandler = () => {
    dispatch(deleteProduct({ cartID }));
    toast.error("Item removed from cart", {
      icon: "😢",
    });
  };

  return (
    // 最後一個 item 不會有底線 (last:xxx)
    <article className="flex flex-row gap-x-4 mb-8 items-center border-b font-medium border-base-300 pb-8 last:border-b-0">
      {/* image */}
      <img
        src={image.url}
        alt={name}
        className="block w-16 h-16 object-cover rounded-lg sm:w-20 sm:h-20 lg:w-24 lg:h-24"
      />

      {/* info */}
      <div className="sm:ml-8 sm:w-40">
        <h2 className="capitalize font-semibold tracking-wide">{name}</h2>
        <p className="capitalize tracking-wide text-secondary">{company}</p>
        <p className="flex items-center gap-x-2 capitalize tracking-wide">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>

      {/* amount & remove */}
      <div className="flex flex-col items-start">
        {/* amount */}
        <div className="flex items-center gap-x-2">
          <button type="button" name="minus" onClick={minusHandler}>
            <FaMinus />
          </button>
          <span className="font-semibold text-2xl text-neutral-focus">
            {amount}
          </span>
          <button type="button" name="plus" onClick={plusHandler}>
            <FaPlus />
          </button>
        </div>

        <button
          className="link mt-2 tracking-wide text-primary no-underline hover:underline hover:text-primary-focus duration-300"
          onClick={removeHandler}
        >
          remove
        </button>
      </div>
      {/* price */}
      {/* ml-auto 讓其會位於最右側的位置 */}
      <div className="sm:ml-auto">
        <p className="text-neutral">{formatPrice(price)}</p>
      </div>
    </article>
  );
};

export default CartItem;
