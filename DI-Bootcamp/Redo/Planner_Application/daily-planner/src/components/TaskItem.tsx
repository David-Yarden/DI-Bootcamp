import { useState, useRef } from 'react';
import { Task } from '../store/actions';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onEdit:   (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);

  const startEdit = (): void => {
    setEditing(true);
    setTimeout(() => editRef.current?.focus(), 0);
  };

  const saveEdit = (): void => {
    const text = editRef.current?.value.trim();
    if (text && text !== task.text) onEdit(task.id, text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter')  saveEdit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
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
        <span className="task-text" onDoubleClick={startEdit}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {!editing && (
          <button className="btn-edit" onClick={startEdit}>Edit</button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;
