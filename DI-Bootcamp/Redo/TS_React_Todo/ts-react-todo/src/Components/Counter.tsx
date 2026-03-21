// Exercise 3: useState Hook with TypeScript

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('None');

  const increment = (): void => {
    setCount((prev) => prev + 1);
    setLastAction('Incremented');
  };

  const decrement = (): void => {
    setCount((prev) => prev - 1);
    setLastAction('Decremented');
  };

  return (
    <div className="card">
      <h2>Counter</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>Last action: <em>{lastAction}</em></p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={decrement}>−</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;
