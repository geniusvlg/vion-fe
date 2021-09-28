import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import "antd/dist/antd.css";

// components dùng chung
import Layout from "./Layout";

// pages
import Error from "pages/error";

// animation
import "animation/animation.css"

export default function App () {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/order" />} />
        <Route path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  )
}
