import React, { useState } from 'react';

function Events() {
  // Part III
  const [isToggleOn, setIsToggleOn] = useState(true);

  // Part I
  const clickMe = () => {
    alert('I was clicked');
  };

  // Part II
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    }
  };

  // Part III
  const handleToggle = () => {
    setIsToggleOn((prev) => !prev);
  };

  return (
    <div>
      {/* Part I */}
      <button onClick={clickMe}>Click me</button>

      <br /><br />

      {/* Part II */}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Press the ENTER key!"
      />

      <br /><br />

      {/* Part III */}
      <p>Exercise 9:</p>
      <button onClick={handleToggle}>{isToggleOn ? 'ON' : 'OFF'}</button>
    </div>
  );
}

export default Events;
