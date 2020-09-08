import React from "react";
import { CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  ThemeOptions,
} from "@material-ui/core/styles";
import { Header } from "./components/Layout/Header";
import { Content } from "./components/Layout/Content";
import { Footer } from "./components/Layout/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import AuthProvider from "./utils/AuthContext";
import { User } from "./components/User";
import { Subscribe } from "./components/Subscribe";
import { SearchResults } from "./components/SearchResults";
import { SignUp } from "./components/SignUp";

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
      main: "#f7a614",
    },
    background: {
      paper: "#333",
      // default: "#000000",
      default: "#181818",
    },
    // default: {
    //   main: "#c80f1e",
    // },
  },
  custom: {
    layout: {
      padding: 80,
      backgroundColor: "#000000",
    },
  },
} as ThemeOptions);

const App = () => (
  <AuthProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header></Header>
        <Content>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/subscribe" component={Subscribe}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route
            exact
            path="/artist/:searchValue"
            component={SearchResults}></Route>
        </Content>
        <Footer></Footer>
      </BrowserRouter>
    </MuiThemeProvider>
  </AuthProvider>
);

export default App;
