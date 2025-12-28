import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../store/todoSlice';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
}

function TodoItem({ id, text, completed }: TodoItemProps) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(id));
  };

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
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      <span style={{
        textDecoration: completed ? 'line-through' : 'none',
        flex: 1
      }}>
        {text}
      </span>
      <button
        onClick={handleRemove}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoItem;
