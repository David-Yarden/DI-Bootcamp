import React, { useRef, useState } from 'react';

function CharacterCounter() {
  const inputRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  const handleChange = () => {
    setCharCount(inputRef.current.value.length);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Character Count: {charCount}</p>
    </div>
  );
}

export default CharacterCounter;
