import React, { Component } from 'react';

export default class UserInput extends Component {
  style = {
    display: "block",
    width: '100%'
  };

  render() {
    return <input style={this.style} onChange={this.props.change} value={this.props.userName} />
  }
}