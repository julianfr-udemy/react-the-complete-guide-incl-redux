import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../../store/actions/auth";

export default connect(
  null,
  dispatch => ({ onLogout: () => dispatch(logout()) })
)(props => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />
});