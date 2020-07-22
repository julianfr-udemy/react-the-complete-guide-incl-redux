import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Cockpit.css';

const cockpit = (props) => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    // const timer = setTimeout(() => alert("Saved data on the cloud"), 1000);
    toggleButtonRef.current.click();
    return (() => {
      console.log("[Cockpit.js] cleanup work in useEffect");
      // clearTimeout(timer);
    })
  }, []);

  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return (() => console.log("[Cockpit.js] 2nd cleanup work in useEffect"));
  });

  const assignedClasses = [];
  const buttonClasses = [];

  if (props.showPersons) {
    buttonClasses.push(classes.Red);
  }

  if (props.personsLength <= 2) assignedClasses.push(classes.red);
  if (props.personsLength <= 1) assignedClasses.push(classes.bold);

  return (
    <div className={classes.Cockpit}>
      <h1 className="App-title">{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref={toggleButtonRef} className={buttonClasses.join(' ')} onClick={props.click}>Toggle Persons</button>
      {<button onClick={authContext.login}>Log In</button>}

    </div>
  );
};

export default React.memo(cockpit);