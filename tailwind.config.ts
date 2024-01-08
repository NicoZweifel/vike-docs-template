import resolveConfig from 'tailwindcss/resolveConfig';

const config = resolveConfig({
  darkMode: 'class',
  content: ['./**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

export default config;
