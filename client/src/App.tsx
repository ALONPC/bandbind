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
      main: "#c80f1e",
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <Content>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/user" exact component={User}></Route>
          <Route path="/subscribe" exact component={Subscribe}></Route>
        </Content>
        <Footer></Footer>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
