/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors: {
      "main-blue": "#006BFF",
      "sub-skyblue": "#08C2FF",
      "sub-lightskyblue": "#BCF2F6",
      black: "#000000",
      white: "#FFFFFF",
      "gray-light": "#F1F1F1",
      gray: "#AEAEAE",
      "gray-dark": "#393939",
      "highlight-yellow": "#FFF100",
    },
    extend: {},
  },
  plugins: [],
};
