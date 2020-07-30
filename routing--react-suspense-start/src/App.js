import React, { Component, Fragment, Suspense } from 'react';
import User from './containers/User';

const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  state = {
    showPosts: false
  }

  modeHandler = () => {
    this.setState(prevState => ({ showPosts: !prevState.showPosts }));
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.showPosts
          ? <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense>
          : <User />
        }
      </Fragment>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route path="/posts" render={() => <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense>} />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
