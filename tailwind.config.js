/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
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
      tag: {
        red: "#FFE2DD",
        yellow: "#FDECC8",
        brown: "#EEE0DA",
        pink: "#F5E0E9",
        orange: "#FADEC9",
        green: "#DBEDDB",
        purple: "#E8DEEE",
        blue: "#D3E5EF",
        default: "#E3E2E0",
        gray: "#E3E2E0",
      },
      "tag-text": {
        red: "#5D1715",
        yellow: "#402C1B",
        brown: "#442B1E",
        pink: "#4C2337",
        orange: "#49290E",
        green: "#1C3829",
        purple: "#412454",
        blue: "#183347",
        default: "#32302C",
        gray: "#32302C",
      },
    },
    extend: {},
  },
  safelist: [
    {
      pattern:
        /bg-tag-(red|yellow|brown|pink|orange|green|purple|blue|default|gray)/,
    },
    {
      pattern:
        /text-tag-text-(red|yellow|brown|pink|orange|green|purple|blue|default|gray)/,
    },
  ],
  plugins: [],
};
