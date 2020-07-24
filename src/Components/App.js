import React from "react";
import Home from "./LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainScreen from "./MainScreen";

export default () => (
  <div style={{ height: "100%" }}>
    <div id="bg"></div>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/mood/" component={MainScreen} />
    </Router>
  </div>
);
