import React from 'react';

const NotFound = ({ location: { pathname } }) => (
  <div>404 error can't find: {pathname}</div>
);

export default NotFound;