import React, { useContext, createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Header } from "./components/Layout/Header";
import { Content } from "./components/Layout/Content";
import { Footer } from "./components/Layout/Footer";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Landing } from "./components/Landing";
import AuthProvider from "./utils/AuthContext";
import { User } from "./components/User";
import { Subscribe } from "./components/Subscribe";
import { ArtistInfo } from "./components/ArtistInfo";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#eee",
    },
    secondary: {
      // main: "#c80f1e",
      main: "#f7a614",
    },
    background: {
      paper: "#333",
      // default: "#000000",
      default: "#181818",
    },
  },
});

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header></Header>
        <Content>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/subscribe" component={Subscribe}></Route>
          <Route
            exact
            path="/artist/:searchValue/"
            component={ArtistInfo}></Route>
        </Content>
        <Footer></Footer>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
