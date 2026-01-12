/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "charcoal": "#0a0a0a",
        "copper": "#DE924F",
        "copper-muted": "rgba(222, 146, 79, 0.2)",
        "panel": "#121212",
        "hairline": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "serif": ["Playfair Display", "serif"],
        "crimson": ["Crimson Pro", "serif"],
        "mono": ["Space Mono", "monospace"],
        "inter": ["Inter", "sans-serif"],
      },
      animation: {
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration) linear infinite",
      },
      keyframes: {
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--gap)))" },
          to: { transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
