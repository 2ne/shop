module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#e4f7fb",
        primary_text: "#005da2",
        secondary: "#005da2",
        secondary_text: "#ffffff",
        interactive: "#005da2",
      },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
        display: ["'CircularStd'", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
