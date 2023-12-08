import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#122155",
      text: "#fafafa",
      title: "#b9babb",
    },
  },
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export { theme };
