/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "cust-white": "white",
      "dark-green": "#17cad0",
      "light-sky": "#66ccd0",
      "dark-sky": "#2196f3",
      backgroundColor: "red",
      "cust-gray": "gray",
      "cust-black": "#191717",
      black: "black",
      "cust-bg": "#EEF5FF",
      "cust-lite-black": "#293333",
      "cust-semiblack": "#3d3a3a",
      "cust-lightgray": "#ede6e6",
      "cust-gray2nd": "#DDDDDD",
      "cust-lite-blue": "#075ff7",
      "cust-EEEDEB": "#EEEDEB",
    },
    boxShadow: {
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.2)",
    },
    animation: {
      bounceb: "bounce 2s infinite",
      pulseeb: "pulse 3s infinite    ",
    },
  },
  plugins: [],
};
