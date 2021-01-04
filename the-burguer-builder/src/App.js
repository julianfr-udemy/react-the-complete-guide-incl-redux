import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions/auth';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

export default withRouter(connect(
  state => ({
    isAuthenticated: state.auth.token !== null
  }),
  dispatch => ({
    onTryAutoSignup: () => dispatch(authCheckState())
  })
)(props => {

  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route path="/auth" render={props => <Auth {...props} />}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/orders" exact render={props => <Orders {...props} />}></Route>
        <Route path="/auth" render={props => <Auth {...props} />}></Route>
        <Route path="/checkout" render={props => <Checkout {...props} />}></Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}));
