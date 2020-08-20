import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Header } from "./components/Layout/Header";
import { Content } from "./components/Layout/Content";
import { Footer } from "./components/Layout/Footer";
// import { EventCard } from "./components/EventCard";
import { BrowserRouter, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
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
      paper: "rgb(209, 209, 209, 0.3)",
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
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      <Content>
        <Route path="/" exact component={Landing}></Route>
        {/* <Route path="/login" exact component={LoginForm}></Route> */}

        {/* <Route path="/checkout" component={Checkout}></Route>
        <Route path="/amiibo/:id" component={AmiiboDetail}></Route> */}
        {/* <EventCard></EventCard> */}
      </Content>
      <Footer></Footer>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
