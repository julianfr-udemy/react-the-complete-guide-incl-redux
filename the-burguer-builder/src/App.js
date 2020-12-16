import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions/auth';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

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
        <Route path="/auth" component={asyncAuth}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/orders" exact component={asyncOrders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/auth" component={asyncAuth}></Route>
          <Route path="/checkout" component={asyncCheckout}></Route>
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
