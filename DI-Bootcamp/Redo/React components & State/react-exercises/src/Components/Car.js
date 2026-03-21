import React, { useState } from 'react';
import Garage from './Garage';

function Car({ model }) {
  const [color] = useState('red');

  return (
    <div>
      <h2>This car is {color} {model}</h2>
      <Garage size="small" />
    </div>
  );
}

export default Car;
