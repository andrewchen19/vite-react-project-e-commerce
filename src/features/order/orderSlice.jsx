import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  orderItems: [],
};

// getLocalStorage
// page refresh 時，可以拿到本地存儲的資料
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("order")) || defaultState;
};

const orderSlice = createSlice({
  name: "order",
  initialState: getLocalStorage(),
  reducers: {
    updateOrder: (state, action) => {
      const data = action.payload;
      state.orderItems.push(data);

      localStorage.setItem("order", JSON.stringify(state));
    },
    // 登出就清除，因為這個 project 沒有使用 database
    clearOrder: (state) => {
      localStorage.setItem("order", JSON.stringify(defaultState));

      // 當返回 defaultState 時，Redux Toolkit 會將它視為一個全新的狀態，並將其用於替換當前的狀態
      return defaultState;
    },
  },
});

// 輸出 slice.reducer
export default orderSlice.reducer;
// 輸出個別的 reducer
export const { updateOrder, clearOrder } = orderSlice.actions;
