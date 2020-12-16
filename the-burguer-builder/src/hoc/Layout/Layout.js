import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from './Layout.module.css';

export default connect(
  state => ({ isAuthenticated: state.auth.token }),
  null,
)(
  class extends Component {
    state = {
      showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
      this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
    }

    render() {
      return (
        <Fragment>
          <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated} />
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuth={this.props.isAuthenticated} />
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Fragment >);
    }
  });