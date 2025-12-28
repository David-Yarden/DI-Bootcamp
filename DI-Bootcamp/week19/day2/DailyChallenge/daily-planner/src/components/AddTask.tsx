import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTask } from '../store/plannerSlice';

function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.planner.selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ date: selectedDate, text: text.trim() }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task..."
        style={{
          padding: '8px',
          marginRight: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '250px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
