module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      0: "0",
      button: "80px",
      full: "100%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
