import React from 'react';
import { Route, Switch } from 'react-router';
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/orders" exact component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
