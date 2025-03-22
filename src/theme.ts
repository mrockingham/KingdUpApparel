// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#e1ddc8", // your preferred background
    },
    text: {
      primary: "#111",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontFamily: "Cinzel, serif",
    },
    h2: {
      fontFamily: "Cinzel, serif",
    },
    h3: {
      fontFamily: "Cinzel, serif",
    },
    h4: {
      fontFamily: "Cinzel, serif",
    },
    h5: {
      fontFamily: "Cinzel, serif",
    },
    h6: {
      fontFamily: "Cinzel, serif",
    },
  },
});

export default theme;
