import React, { Component } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import AuthContext from '../context/auth-context';
import Auxiliary from '../hoc/Auxiliary';
import withClass from '../hoc/withClassFunction';
import classes from './App.css';

class App extends Component {
  state = {
    persons: [
      { id: '0', name: "Max", age: 28 },
      { id: '1', name: "Manu", age: 29 },
      { id: '2', name: "Stephanie", age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    isAuthenticated: false
  };

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log("[App.js] componentWillMount");
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  }

  switchNameHandler = name => {
    console.log("Was clicked!");
    // DON'T DO THIS this.state.persons[0].name = "Maximilian";
    this.setState({
      persons: [
        { id: '0', name, age: 28 },
        { id: '1', name: "Manu", age: 29 },
        { id: '2', name: "Stephanie", age: 27 }
      ]
    });
  }

  deletePersonHandler = (index) => {
    this.setState({ persons: this.state.persons.filter((p, i) => i !== index) });
  }

  nameChangedHandler = (event, id) => {
    this.setState((prevState, props) => ({
      persons: this.state.persons.map(p => {
        if (p.id === id) p.name = event.target.value;
        return p;
      }),
      changeCounter: prevState.changeCounter + 1
    }));
  }

  loginHandler = () => {
    this.setState({ isAuthenticated: true });
  }

  render() {
    console.log("[App.js] render");
    return (
      <Auxiliary>
        <button onClick={() => this.setState({ showCockpit: false })}>Remove Cockpit</button>
        <AuthContext.Provider value={{ isAuthenticated: this.state.isAuthenticated, login: this.loginHandler }}>
          {!this.state.showCockpit ? null :
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLenght={this.state.persons.lenght}
              click={this.togglePersonsHandler}
            />}
          {!this.state.showPersons ? null :
            <Persons
              persons={this.state.persons}
              click={this.deletePersonHandler}
              changed={this.nameChangedHandler} />}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
