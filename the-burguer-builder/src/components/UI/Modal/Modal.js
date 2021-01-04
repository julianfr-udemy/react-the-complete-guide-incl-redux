import React, { Fragment, memo } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

export default memo(props => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Fragment>);
}, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);