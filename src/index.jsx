import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext";
import Themes from "./themes";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import LoginContextComponent from "./context/LoginContext";
import { ThemeProvider } from "react-bootstrap";
import { CssBaseline } from "@material-ui/core";
import LoadingContextComponent from "./context/LoadingContext";
import Layout from './components/Layout';
ReactDOM.render(
  <ThemeProvider theme={Themes.default}>
    <LayoutProvider>
      <UserProvider>
        <LoginContextComponent>
          <LoadingContextComponent>
            <CssBaseline />
            <AuthProvider>
            <Layout />
            </AuthProvider>
          </LoadingContextComponent>
        </LoginContextComponent>
      </UserProvider>
    </LayoutProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
