/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ scans all source files for class names
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
