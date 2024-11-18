import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          50: "#f3faf8",
          100: "#d7f0ea",
          200: "#afe0d5",
          300: "#7ecabb",
          400: "#52ac9d",
          500: "#3a9284",
          600: "#2c756b",
          700: "#275e58",
          800: "#234c47",
          900: "#21403d",
          950: "#0e2524",
        },
      },
    },
  },
};
