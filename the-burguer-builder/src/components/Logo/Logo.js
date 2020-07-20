import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

export default () => {
  return (
    <img className={classes.Logo} src={burgerLogo} alt="My Burger"></img>
  );
}