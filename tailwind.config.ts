import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/Header.tsx",
    "./Layout.tsx",
    "./mdxComponents.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

export default config;
