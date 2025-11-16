import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log("Input changed:", input);
  }, [input]);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
