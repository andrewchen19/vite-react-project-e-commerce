import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  filtered_products: [],
  all_products: [],
  sort: "price-lowest",
  layout: "grid",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

// getLocalStorage
// page refresh 時，可以拿到本地存儲的資料
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("filter")) || defaultState;
};

const filterSlice = createSlice({
  name: "filter",
  initialState: getLocalStorage(),
  reducers: {
    getAllProducts: (state, action) => {
      const allProducts = action.payload;

      // 初始設定是 sort = "price-lowest"
      // 所以一開始就必須先排好價錢順序(由小到大)
      allProducts.sort((a, b) => a.price - b.price);

      state.filtered_products = allProducts;
      state.all_products = allProducts;
      state.sort = "price-lowest";
      state.layout = "grid";

      state.filters = {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
      };

      const heightPrice = allProducts[allProducts.length - 1].price;
      state.filters.max_price = heightPrice;
      state.filters.price = heightPrice;

      localStorage.setItem("filter", JSON.stringify(state));
    },
    updateLayout: (state, action) => {
      const newLayout = action.payload;
      state.layout = newLayout;

      localStorage.setItem("filter", JSON.stringify(state));
    },
    updatedSort: (state, action) => {
      const newSort = action.payload;
      state.sort = newSort;

      if (state.sort === "price-lowest") {
        // base on numeric values
        state.filtered_products = state.filtered_products.sort(
          (a, b) => a.price - b.price
        );
        state.allProducts = state.all_products.sort(
          (a, b) => a.price - b.price
        );
      }
      if (state.sort === "price-highest") {
        // base on numeric values
        state.filtered_products = state.filtered_products.sort(
          (a, b) => b.price - a.price
        );
        state.all_products = state.all_products.sort(
          (a, b) => b.price - a.price
        );
      }
      if (state.sort === "name-a") {
        // localeCompare()
        state.filtered_products = state.filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        state.all_products = state.all_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (state.sort === "name-z") {
        // localeCompare()
        state.filtered_products = state.filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        state.all_products = state.all_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      localStorage.setItem("filter", JSON.stringify(state));
    },
    updatedFilter: (state, action) => {
      const { name, value } = action.payload;
      // console.log(name, value);

      // dynamic object key
      state.filters[name] = value;

      localStorage.setItem("filter", JSON.stringify(state));
    },
    clearFilter: (state) => {
      state.filtered_products = state.all_products;

      state.filters = {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      };

      localStorage.setItem("filter", JSON.stringify(state));
    },
    filterProducts: (state, action) => {
      const { text, company, category, color, price, shipping } = state.filters;

      // 這邊要使用 all_products
      // 確保每次 filter 時，都是 whole products
      let temProducts = [...state.all_products];

      // text 部分
      // text 不為 empty string 時
      if (text) {
        temProducts = temProducts.filter((p) => {
          return p.name.toLowerCase().startsWith(text);
        });
      }

      // category 部分
      if (category !== "all") {
        temProducts = temProducts.filter((p) => {
          return p.category === category;
        });
      }

      // company 部分
      if (company !== "all") {
        temProducts = temProducts.filter((p) => {
          return p.company === company;
        });
      }

      // color 部分
      if (color !== "all") {
        temProducts = temProducts.filter((p) => {
          return p.colors.includes(color);
        });
      }

      // price 部分 (price 為 string)
      temProducts = temProducts.filter((p) => {
        return p.price <= parseInt(price);
      });

      // shipping 部分
      if (shipping) {
        temProducts = temProducts.filter((p) => {
          return p.shipping === shipping;
        });
      }

      state.filtered_products = temProducts;
      localStorage.setItem("filter", JSON.stringify(state));
    },
  },
});

// 輸出 slice.reducer
export default filterSlice.reducer;
// 輸出個別的 reducer
export const {
  getAllProducts,
  updateLayout,
  updatedSort,
  updatedFilter,
  clearFilter,
  filterProducts,
} = filterSlice.actions;
