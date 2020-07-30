import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';
import Posts from './Posts/Posts';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink to="/posts/" exact>Posts</NavLink></li>
              <li><NavLink to={{ pathname: "/new-post", hash: "#submit", search: "?quick-submit=true" }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not Found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;