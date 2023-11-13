import { createSlice } from "@reduxjs/toolkit";

// cartTotalPrice 是不包含稅 & 運費之前的價格
// orderTotalPrice 是最後的總價 (加上稅 & 運費)
const defaultState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalPrice: 0,
  shipping: 500,
  tax: 0,
  orderTotalPrice: 0,
};

// getLocalStorage
// page refresh 時，可以拿到本地存儲的資料
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getLocalStorage(),
  reducers: {
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      // 當返回 defaultState 時，Redux Toolkit 會將它視為一個全新的狀態，並將其用於替換當前的狀態
      return defaultState;
    },
    addProduct: (state, action) => {
      const { product } = action.payload;

      // 沒找到 -> undefined
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      // others
      state.cartTotalAmount += product.amount;
      state.cartTotalPrice += product.amount * product.price;

      // caseReducers -> we can access other reducer inside specific reducer
      // invoke reusing code
      cartSlice.caseReducers.calculateAndStore(state);
    },
    deleteProduct: (state, action) => {
      const { cartID } = action.payload;

      // 找到才清除
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      // others
      state.cartTotalAmount -= product.amount;
      state.cartTotalPrice -= product.amount * product.price;

      // invoke reusing code
      cartSlice.caseReducers.calculateAndStore(state);
    },
    editProduct: (state, action) => {
      const { cartID, amount, value, stock } = action.payload;

      const product = state.cartItems.find((i) => i.cartID === cartID);

      let newAmount;

      // 確認存貨數量
      if (value === "minus") {
        if (amount > 1) {
          newAmount = amount - 1;
        } else {
          newAmount = 1;
        }
      }

      if (value === "plus") {
        if (amount >= stock) {
          newAmount = stock;
        } else {
          newAmount = amount + 1;
        }
      }

      // other
      state.cartTotalAmount += newAmount - product.amount;
      state.cartTotalPrice += (newAmount - product.amount) * product.price;
      // 寫在上面兩行的底下邏輯才正確
      product.amount = newAmount;

      // invoke reusing code
      cartSlice.caseReducers.calculateAndStore(state);
    },
    // reusing code
    calculateAndStore: (state) => {
      state.tax = 0.1 * state.cartTotalPrice;
      state.orderTotalPrice = state.cartTotalPrice + state.tax + state.shipping;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// 輸出 slice.reducer
export default cartSlice.reducer;
// 輸出個別的 reducer
export const { clearCart, addProduct, deleteProduct, editProduct } =
  cartSlice.actions;
