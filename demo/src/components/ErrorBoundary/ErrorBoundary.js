import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    message: ''
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      message: error.message
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.message}</h1>;
    } else {
      return this.props.children;
    }
  }
}