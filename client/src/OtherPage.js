import React from 'react';
import { Link } from 'react-router-dom';

export default() => {
  return (
    <div>
      This is the other side of the Universe!
      <Link to="/">Go Back</Link>
    </div>
  );
};
