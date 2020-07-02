import React from "react";
import Home from "./Home";
import ResultsScreen from "./ResultsScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SelectorScreen from "./SelectorScreen";

export default () => (
  <div style={{ height: "100%" }}>
    <div id="bg"></div>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/mood/" component={SelectorScreen} />
    </Router>
  </div>
);
