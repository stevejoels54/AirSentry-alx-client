import { nextui } from "@nextui-org/react";

export default {
  plugins: {
    tailwindcss: {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      darkMode: "class",
      plugins: [nextui()],
    },
    autoprefixer: {},
  },
};
