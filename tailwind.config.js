import { orgColours } from "./src/org";
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    letterSpacing: {
      tight: "-0.011em",
      normal: "0",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "728px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        primary: orgColours?.primary ?? "#056eef",
        primary_text: orgColours?.primary_text ?? "#fff",
        secondary: orgColours?.secondary ?? "#0b58c2",
        secondary_text: orgColours?.secondary_text ?? "#fff",
        interactive: orgColours?.interactive ?? "#056eef",
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
};
