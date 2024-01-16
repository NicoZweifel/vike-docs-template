import resolveConfig from 'tailwindcss/resolveConfig';

const config = resolveConfig({
  darkMode: 'class',
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './renderer/**/*.{ts,tsx}',
    './docs/**/*.{tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

export default config;
