module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    letterSpacing: {
      tight: "-0.011em",
      normal: "0",
    },
    container: {
      center: true,
      padding: "0.75rem",
      screens: {
        sm: "640px",
        md: "728px",
        lg: "1024px",
        xl: "1280px",
      },
    },
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
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
        ],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
