import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '0', name: "Max", age: 28 },
      { id: '1', name: "Manu", age: 29 },
      { id: '2', name: "Stephanie", age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false
  };

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
    this.setState({
      persons: this.state.persons.map(p => {
        if (p.id === id) p.name = event.target.value;
        return p;
      })
    });
  }

  render() {
    let persons = null;
    let buttonClasses = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div> {
          this.state.persons.map((p, i) =>
            <Person
              key={p.id}
              name={p.name}
              age={p.age}
              click={this.deletePersonHandler.bind(this, i)}
              changed={event => this.nameChangedHandler(event, p.id)}
            />)
        } </div>
      );

      buttonClasses.push(classes.Red)
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) assignedClasses.push('red');
    if (this.state.persons.length <= 1) assignedClasses.push('bold');

    return (
      <div className={classes.App}>
        <h1 className="App-title">Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={buttonClasses.join(' ')} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div >
    );
  }
}

export default App;
