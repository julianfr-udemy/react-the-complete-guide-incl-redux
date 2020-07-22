import React from 'react';

export default (WrappedComponent, className) => {
  return props => <div className={className}><WrappedComponent {...props} /></div>
}
