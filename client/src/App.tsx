import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Header } from "./components/Layout/Header";
import { Content } from "./components/Layout/Content";
import { Footer } from "./components/Layout/Footer";
import { EventCard } from "./components/EventCard";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#c80f1e",
    },
    background: {
      default: "black",
      // header: "#333", // change this to black afterwards
      // footer: "#333", // change this to black afterwards
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});
console.log("theme", theme);

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      <Content>
        <EventCard></EventCard>
      </Content>
      <Footer></Footer>
    </ThemeProvider>
  </>
);

export default App;
