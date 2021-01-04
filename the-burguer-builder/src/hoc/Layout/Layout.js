import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from './Layout.module.css';

export default connect(
  state => ({ isAuthenticated: state.auth.token }),
  null,
)(props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Fragment>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Fragment >);
});