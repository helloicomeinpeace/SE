import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import SignUp from "../components/auth/SignUp"
import SignIn from "../components/auth/SignIn"
class AuthNav extends Component {
  render() {
    return (
            <Fragment>
              <Switch>
                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/" component={SignIn} />
              </Switch>
            </Fragment>
    );
  }
}

export default AuthNav;
