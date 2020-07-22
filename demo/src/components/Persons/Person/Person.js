import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import AuthContext from '../../../context/auth-context';
import withClass from '../../../hoc/withClassFunction';
import classes from './Person.css';

class Person extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context);
  }

  render() {
    console.log('[Person.js] rendering...');

    return <Fragment>
      {this.context.isAuthenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
      <p key="i1" onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old!</p>
      <p key="i2" > {this.props.children}</p>
      <input key="i3" ref={this.inputElementRef} /*ref={inputEl => { this.inputElement = inputEl }}*/ type="text" onChange={this.props.changed} value={this.props.name} />
    </Fragment>;
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);