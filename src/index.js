import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TolongURL from "./TolongURL";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route exact path="/:id">
                <TolongURL />
            </Route>
        </Switch>
    </Router>,
    document.getElementById("root")
);
