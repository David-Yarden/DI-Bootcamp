import { useState, useRef, useEffect } from 'react';
import { useTaskContext, Task } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: editText.trim() } });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '8px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        border: '1px solid #ddd',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        style={{ marginRight: '10px', width: '20px', height: '20px' }}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #2196F3',
            borderRadius: '4px',
          }}
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#888' : '#333',
          }}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={handleEdit}
        style={{
          padding: '5px 10px',
          marginLeft: '10px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Edit
      </button>

      <button
        onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}
        style={{
          padding: '5px 10px',
          marginLeft: '5px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
