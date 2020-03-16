import React, { Component } from 'react';
import './App.css';
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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

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
    }

    return (
      <div className="App">
        <h1 className="App-title">Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div >
    );
    // return React.createElement(
    //   'div', {
    //   className: 'App'
    // }, React.createElement(
    //   'h1',
    //   null,
    //   'Does this work now?'
    // ), 'Hi, I\'m a React App');
  }
}

export default App;
