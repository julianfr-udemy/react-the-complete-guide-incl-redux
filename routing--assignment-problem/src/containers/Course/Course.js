import React, { Component } from 'react';

class Course extends Component {
  state = {
    id: null,
    title: null
  }

  componentDidMount() {
    this.parseSearch();
  }

  componentDidUpdate() {
    if (+this.props.match.params.id !== +this.state.id) {
      this.parseSearch();
    }
  }

  parseSearch() {
    const search = String(this.props.location.search).replace(/%20/g, " ");
    const searchParams = /name=([^&]*)&?/.exec(search);

    this.setState({ id: this.props.match.params.id, title: searchParams ? searchParams[1] : null });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {this.state.id}</p>
      </div>
    );
  }
}

export default Course;