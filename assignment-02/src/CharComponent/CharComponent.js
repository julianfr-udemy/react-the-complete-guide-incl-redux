import React from 'react';
import './CharComponent.css';

export default props => <div className="CharComponent" onClick={props.onRemove}>{props.character}</div>