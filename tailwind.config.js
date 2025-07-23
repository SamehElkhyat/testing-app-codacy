/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
      },
      screens: {
        sm: "390px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        lg2: "1270px",
      },
    },
  },
  plugins: [],
};
