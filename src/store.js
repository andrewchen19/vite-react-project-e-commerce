import { configureStore } from "@reduxjs/toolkit";

import themesReducer from "./features/themes/themesSlice";
import cartReducer from "./features/cart/cartSlice";
import filterReducer from "./features/filter/filterSlice";
import orderReducer from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    themes: themesReducer,
    cart: cartReducer,
    filter: filterReducer,
    order: orderReducer,
  },
});
