import React from 'react';
import classes from './NavigationItem.module.css';

export default props => {
  return (
    <li className={classes.NavigationItem} href="/">
      <a className={props.active ? classes.active : null} href={props.link}>{props.children}</a>
    </li>
  );
}