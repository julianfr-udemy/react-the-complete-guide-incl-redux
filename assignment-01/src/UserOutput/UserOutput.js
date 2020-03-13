import React from 'react';
import './UserOutput.css';

const userOutput = props =>
  <div className="UserOutput">
    <p>Username: <span>{props.userName || "lorem"}</span></p>
    <p>ipsum</p>
  </div>;

export default userOutput;