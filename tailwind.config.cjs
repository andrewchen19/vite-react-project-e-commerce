/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#222",
      white: "#fff",
      "gray-50": "#f9fafb",
      "gray-100": "#f3f4f6",
      "gray-200": "#e5e7eb",
      "gray-300": "#d1d5db",
      "gray-400": "#9ca3af",
      "gray-500": "#6b7280",
      "gray-600": "#4b5563",
      "gray-700": "#374151",
      "gray-800": "#1f2937",
      "gray-900": "#111827",
      "japandi-black": "#241f19",
      "japandi-blue": "#435764",
      "japandi-brown-dark": "#a48374",
      "japandi-brown-light": "#cbad8d",
      "japandi-gray-dark": "#91908e",
      "japandi-gray-light": "#Dbdad6",
      "japandi-green-dark": "#464b25",
      "japandi-green-light": "#959d90",
      "japandi-nude": "#e7d7c9",
      "japandi-orange": "#b99a7c",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        myLight: {
          primary: "#da8ee7", // 紫
          secondary: "#70acc7", // 藍
          accent: "#4d8576", // 湖綠
          neutral: "#F2AAAE", // 粉紅
          "base-100": "#ffffff", // 基底色
        },
        myDark: {
          primary: "#9d72ff", // 螢光紫
          secondary: "#00b4d8", // 螢光藍
          accent: "#73952E", // 亮綠
          neutral: "#ec5182", // 螢光紅
          "base-100": "#272935", // 基底色
        },
      },
    ],
  },
};
