import React, { PureComponent } from 'react';
import Person from './Person/Person';

export default class persons extends PureComponent {
  static getDirevedStateFromProps(props, state) {
    console.log("[Persons.js] getDerivedStateFromProps", state);
    return state;
  }

  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] componentWillReceiveProps", props);
  // }

  // shouldComponentUpdate(nextProps, nextUpdate) {
  //   console.log("[Persons.js] shouldComponentUpdate");
  //   if (nextProps.persons !== this.props.persons) { return true; }
  //   return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "snapshot" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate", snapshot);
  }

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((p, i) => {

      return <Person
        key={p.id}
        name={p.name}
        age={p.age}
        click={this.props.click.bind(this, i)}
        changed={event => this.props.changed(event, p.id)}
      />
    });
  }
}