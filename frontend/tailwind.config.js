/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        secondary: "var(--text-secondary)",
        text: "var(--text-primary)",
        card: "var(--card)",
        border: "var(--border)",
        backgroundHover: "var(--hover)",
        cardHover: "var(--selected)",
        muted: "var(--muted)",
        selected: "var(--selected)",
      },
    },
  },
  plugins: [],
};
