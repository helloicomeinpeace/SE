import React, { Component } from "react";
import { connect } from "react-redux";
// import { logoutUser } from "../actions";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  // handleLogout = () => {
  //   const { dispatch } = this.props;
  //   dispatch(logoutUser());
  // };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return <Redirect to="/products" />;
  }
}
// function mapStateToProps(state) {
//   return {
//     isLoggingOut: state.auth.isLoggingOut,
//     logoutError: state.auth.logoutError
//   };
// }
// export default connect(mapStateToProps)(Home);