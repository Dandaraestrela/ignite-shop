import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    "::-webkit-scrollbar": {
      width: "20px",
    },

    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
      backgroundColor: "$gray900",
      borderRadius: "20px",
      border: "6px solid transparent",
      backgroundClip: "content-box",
    },
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
