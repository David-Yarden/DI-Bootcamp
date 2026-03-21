import React, { useState, useRef } from 'react';
import { useTaskContext } from './TaskContext';

function TaskItem({ task }) {
  const { dispatch } = useTaskContext();
  const [editing, setEditing] = useState(false);
  const editRef = useRef(null);

  const startEditing = () => {
    setEditing(true);
    // focus after render
    setTimeout(() => editRef.current && editRef.current.focus(), 0);
  };

  const saveEdit = () => {
    const newText = editRef.current.value.trim();
    if (newText && newText !== task.text) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: newText } });
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
      />

      {editing ? (
        <input
          ref={editRef}
          className="edit-input"
          defaultValue={task.text}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
        />
      ) : (
        <span className="task-text" onDoubleClick={startEditing}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {!editing && (
          <button className="btn-edit" onClick={startEditing}>Edit</button>
        )}
        <button
          className="btn-delete"
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
