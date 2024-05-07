/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        customBlue: "#38b6ff",
        lightBlue: "#6dc6ff",
        darkBlue: "#2d8bf7",
        lightGreen: "#6dd87f",
        darkGreen: "#2f9f5f",
        mintGreen: "#7cf0bd",
      },
    },
  },
  plugins: [],
};
