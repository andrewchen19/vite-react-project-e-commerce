import { createSlice } from "@reduxjs/toolkit";

const themes = {
  light: "myLight",
  dark: "myDark",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  theme: getThemeFromLocalStorage(),
};

const themesSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const { light, dark } = themes;
      state.theme = state.theme === light ? dark : light;
      // 使用 document 的 documentElement 屬性，就可以拿到 <html> element
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

// 輸出 slice.reducer
export default themesSlice.reducer;
// 輸出個別的 reducer
export const { toggleTheme } = themesSlice.actions;
