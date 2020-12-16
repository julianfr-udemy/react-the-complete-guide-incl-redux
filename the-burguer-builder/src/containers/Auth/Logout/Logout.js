import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../../store/actions/auth";

export default connect(
  null,
  dispatch => ({ onLogout: () => dispatch(logout()) })
)(class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />
  }
});