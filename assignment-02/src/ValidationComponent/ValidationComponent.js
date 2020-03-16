import React from 'react';

export default props => <p>Text {props.length < 5 ? "too short" : "long enough"}</p>;