import React, { Component } from "react";

export default importComponent => class extends Component {
  state = {
    component: null
  };

  componentDidMount() {
    importComponent()
      .then(component => this.setState({ component: component.default }));
  }

  render() {
    const C = this.state.component;

    return C ? <C {...this.props} /> : null;
  }
}