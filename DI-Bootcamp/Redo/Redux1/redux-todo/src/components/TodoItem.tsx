import { Todo } from '../store/actions';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button className="btn-remove" onClick={() => onRemove(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoItem;
