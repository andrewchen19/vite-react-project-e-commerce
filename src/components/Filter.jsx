import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice, getUniqueValues } from "../utilize";
import { FaCheck } from "react-icons/fa";
import {
  updatedFilter,
  clearFilter,
  filterProducts,
} from "../features/filter/filterSlice";

const Filter = () => {
  const {
    all_products,
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
  } = useSelector((store) => store.filter);

  // 拿到不重複的屬性的內容(詳見 utilize)
  const companies = getUniqueValues(all_products, "company");
  const categories = getUniqueValues(all_products, "category");
  const colors = getUniqueValues(all_products, "colors");

  const dispatch = useDispatch();

  const filterHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // 加但書，因為 button & checkbox 無法使用 e.target.value
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.getAttribute("data-color");
    }
    if (name === "shipping") {
      value = e.target.checked;
    }

    dispatch(updatedFilter({ name, value }));
    dispatch(filterProducts({ name, value }));
  };

  return (
    <section>
      <div className="md:sticky md:top-10">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <input
            type="text"
            name="text"
            placeholder="Search"
            className="mb-4 py-1 pl-2 bg-base-200 rounded-md w-[10rem] tracking-wide"
            value={text}
            onChange={filterHandler}
          />

          {/* category */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Category</h3>
            <div className="flex flex-col items-start gap-y-2">
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    name="category"
                    className={`capitalize text-sm tracking-wide text-gray-500 ${
                      c === category && "border-b border-primary-focus"
                    }`}
                    onClick={filterHandler}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* company */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Company</h3>
            <select
              className="select select-xs select-bordered w-[5rem]"
              name="company"
              value={company}
              onChange={filterHandler}
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>

          {/* color */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Color</h3>
            <div className="flex gap-x-2">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      className={`capitalize text-sm tracking-wide text-gray-500 ${
                        c === color && "border-b border-primary-focus"
                      }`}
                      onClick={filterHandler}
                      data-color="all"
                    >
                      {c}
                    </button>
                  );
                }

                return (
                  <button
                    key={index}
                    name="color"
                    className="w-5 h-5 rounded-full grid place-items-center text-sm text-base-100"
                    style={{ backgroundColor: c }}
                    onClick={filterHandler}
                    // 用 data-color 來儲存顏色值
                    data-color={c}
                  >
                    {c === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* price */}
          <div className="mb-3">
            <h3 className="font-semibold">Price</h3>
            <label className="label" htmlFor="price">
              {/* 使用者移動 range 時，動態顯示數字 */}
              <span className="label-text capitalize">
                {formatPrice(price)}
              </span>
            </label>
            <input
              type="range"
              id="price"
              name="price"
              min={min_price}
              max={max_price}
              value={price}
              onChange={filterHandler}
              className="range range-primary range-sm max-w-[10rem]"
            />
          </div>

          {/* shipping */}
          <div className="mb-8">
            <div className="flex gap-x-3 items-center">
              <label htmlFor="shipping">
                <h3 className="capitalize font-semibold">free shipping</h3>
              </label>
              <input
                type="checkbox"
                id="shipping"
                name="shipping"
                checked={shipping}
                onChange={filterHandler}
                className="checkbox checkbox-sm"
              />
            </div>
          </div>
        </form>
        {/* clear filter */}
        <button
          className="btn btn-sm btn-secondary tracking-wider"
          onClick={() => dispatch(clearFilter())}
        >
          clear filter
        </button>
      </div>
    </section>
  );
};

export default Filter;
