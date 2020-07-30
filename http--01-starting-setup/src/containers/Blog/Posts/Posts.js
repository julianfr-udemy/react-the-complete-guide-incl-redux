import React, { Component } from 'react';
import { Route } from 'react-router';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

export default class extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get('posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: "Max" }));

        this.setState({ posts: updatedPosts });
      });
  }

  postSelectedHandler(id) {
    // this.setState({ selectedPostId: id });
    this.props.history.push("/posts/" + id);
  }

  render() {
    const posts = this.state.posts.map(post =>
      // <Link to={"/" + post.id}>
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)} />
      // </Link>
    );

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
      </div>
    );
  }
}