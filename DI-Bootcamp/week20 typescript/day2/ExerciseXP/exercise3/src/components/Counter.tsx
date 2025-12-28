import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('None');

  const handleIncrement = () => {
    setCount(count + 1);
    setLastAction('Increment');
  };

  const handleDecrement = () => {
    setCount(count - 1);
    setLastAction('Decrement');
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>Last action: {lastAction}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default Counter;
