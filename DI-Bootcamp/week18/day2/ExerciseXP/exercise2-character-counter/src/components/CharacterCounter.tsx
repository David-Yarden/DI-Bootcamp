import { useRef, useState } from 'react';

function CharacterCounter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    if (inputRef.current) {
      setCount(inputRef.current.value.length);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Character Counter</h2>
      <div style={{ marginTop: '20px' }}>
        <input
          ref={inputRef}
          type="text"
          onInput={handleInput}
          placeholder="Type something..."
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div
        style={{
          marginTop: '15px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: count > 50 ? '#e74c3c' : '#2ecc71',
        }}
      >
        Character count: {count}
      </div>
      {count > 50 && (
        <p style={{ color: '#e74c3c', marginTop: '10px' }}>
          Warning: Text is getting long!
        </p>
      )}
    </div>
  );
}

export default CharacterCounter;
