import { useDispatch, useSelector } from "react-redux";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { updateLayout, updatedSort } from "../features/filter/filterSlice";

import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ProductsContainer = () => {
  const { filtered_products, sort, layout } = useSelector(
    (store) => store.filter
  );

  // utility function
  const activeButton = (pattern) => {
    return `btn btn-sm btn-circle  ${
      pattern === layout
        ? "btn-accent text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  const dispatch = useDispatch();

  const sortHandler = (e) => {
    dispatch(updatedSort(e.target.value));
  };

  const layoutHandler = (name) => {
    dispatch(updateLayout(name));
  };

  return (
    <>
      {/* sort 部分 */}
      <div className="grid grid-cols-[1fr] gap-y-2 items-center">
        <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:items-center">
          <h4 className="pl-1">
            {filtered_products.length} product
            {filtered_products.length > 1 && "s"} found
          </h4>

          <div className="space-x-1">
            <button
              type="button"
              className={activeButton("grid")}
              onClick={() => layoutHandler("grid")}
            >
              <BsFillGridFill />
            </button>
            <button
              type="button"
              name="list"
              className={activeButton("list")}
              onClick={() => layoutHandler("list")}
            >
              <BsList />
            </button>
          </div>
        </div>

        <hr className="text-base-300" />

        <div className="flex flex-row items-center">
          <label className="label capitalize mr-2" htmlFor="sort">
            Sort by
          </label>
          <select
            className="select select-xs select-bordered"
            id="sort"
            value={sort}
            onChange={sortHandler}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a - z)</option>
            <option value="name-z">name (z - a)</option>
          </select>
        </div>
      </div>

      {/* products 部分  */}
      {filtered_products.length === 0 && (
        <h5 className="mt-12 text-2xl">
          Sorry, no products match your search ...
        </h5>
      )}
      {/* grid or list */}
      {layout === "grid" ? <ProductsGrid /> : <ProductsList />}
    </>
  );
};

export default ProductsContainer;
