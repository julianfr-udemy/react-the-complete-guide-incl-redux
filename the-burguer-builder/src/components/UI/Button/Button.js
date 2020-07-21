import React from 'react';
import classes from './Button.module.css';

export default props => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      type="button"
      onClick={props.clicked}>
      {props.children}
    </button>
  );
}