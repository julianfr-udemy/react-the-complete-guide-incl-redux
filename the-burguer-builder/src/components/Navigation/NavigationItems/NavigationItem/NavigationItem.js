import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

export default props => {
  return (
    <li className={classes.NavigationItem} href="/">
      <NavLink activeClassName={classes.active} to={props.link} exact={props.exact}>{props.children} </NavLink>
    </li>
  );
}