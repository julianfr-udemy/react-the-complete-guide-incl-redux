import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions/auth';

export default withRouter(connect(
  state => ({
    isAuthenticated: state.auth.token !== null
  }),
  dispatch => ({
    onTryAutoSignup: () => dispatch(authCheckState())
  })
)(class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/orders" exact component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}));
