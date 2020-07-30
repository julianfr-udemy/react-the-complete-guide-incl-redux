import React, { Component } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul style={{ listStyle: "none", margin: "auto", padding: 0 }}>
            <li style={{ margin: "10px", display: "inline-block" }}>
              <NavLink to="/courses" activeStyle={{ color: "#FA923F" }}>Courses</NavLink>
            </li>
            <li style={{ margin: "10px", display: "inline-block" }}>
              <NavLink to="/users" activeStyle={{ color: "#FA923F" }}>Users</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/courses" component={Courses} />
          <Route path="/users" component={Users} />
          <Redirect from="/all-courses" to="/courses"></Redirect>
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
