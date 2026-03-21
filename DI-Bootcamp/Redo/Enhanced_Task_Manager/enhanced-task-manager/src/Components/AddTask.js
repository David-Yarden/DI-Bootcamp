import React, { useRef } from 'react';
import { useTaskContext } from './TaskContext';

function AddTask() {
  const { dispatch } = useTaskContext();
  const inputRef = useRef(null);

  const handleAdd = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    dispatch({ type: 'ADD_TASK', payload: text });
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="add-task">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;
