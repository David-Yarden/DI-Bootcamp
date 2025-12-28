import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { editTask, deleteTask, toggleTaskComplete, selectCategoryById } from '../store/taskSlice';

interface TaskItemProps {
  id: number;
  title: string;
  categoryId: number;
  completed: boolean;
}

function TaskItem({ id, title, categoryId, completed }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const category = useSelector((state: RootState) => selectCategoryById(state, categoryId));

  const handleToggle = useCallback(() => {
    dispatch(toggleTaskComplete(id));
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    if (editTitle.trim()) {
      dispatch(editTask({ id, title: editTitle.trim() }));
      setIsEditing(false);
    }
  }, [dispatch, id, editTitle]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(id));
  }, [dispatch, id]);

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
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{ flex: 1, padding: '4px' }}
        />
        <button onClick={handleEdit} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
          Save
        </button>
        <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#888', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
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
      backgroundColor: completed ? '#e8f5e9' : '#f5f5f5',
      borderRadius: '4px'
    }}>
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      <span style={{ flex: 1, textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
        <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666', backgroundColor: '#e0e0e0', padding: '2px 6px', borderRadius: '10px' }}>
          {category?.name}
        </span>
      </span>
      <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
