import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const switchNameHandler = () => {
    console.log("Was clicked!");
    // DON'T DO THIS this.state.persons[0].name = "Maximilian";
    setPersonState({
      persons: [
        { name: "Maxilian", age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 }
      ]
    })
  };

  const [otherState, setOtherPersonState] = useState('Some other value');

  const [personState, setPersonState] = useState({
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 }
    ]
  });

  console.log(personState);

  return (
    <div className="App">
      <h1 className="App-title">Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personState.persons[0].name} age={personState.persons[0].age} />
      <Person name={personState.persons[1].name} age={personState.persons[1].age} />
      <Person name={personState.persons[2].name} age={personState.persons[2].age} />
    </div >
  );
}
export default app;

