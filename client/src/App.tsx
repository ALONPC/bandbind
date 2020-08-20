import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Header } from "./components/Layout/Header";
import { Content } from "./components/Layout/Content";
import { Footer } from "./components/Layout/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import { Landing } from "./components/Landing";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
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
    },
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
