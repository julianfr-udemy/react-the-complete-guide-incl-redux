import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Users } from './containers/Users';
import asyncComponent from './hoc/asyncComponent';

export class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> |
          <Link to="/pizza">Pizza</Link>
        </div>
        <div>
          <Route path="/" exact component={Users} />
          <Route path="/pizza" exact component={asyncComponent(() => import('./containers/Pizza'))} />
        </div>
      </div>
    )
  }
}