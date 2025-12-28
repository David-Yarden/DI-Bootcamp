import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../store/plannerSlice';

interface TaskItemProps {
  id: number;
  text: string;
  date: string;
}

function TaskItem({ id, text, date }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (editText.trim()) {
      dispatch(editTask({ date, id, text: editText.trim() }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask({ date, id }));
  };

  if (isEditing) {
    return (
      <li style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{ flex: 1, padding: '4px' }}
        />
        <button
          onClick={handleEdit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          style={{
            backgroundColor: '#888',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      marginBottom: '8px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px'
    }}>
      <span style={{ flex: 1 }}>{text}</span>
      <button
        onClick={() => setIsEditing(true)}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
