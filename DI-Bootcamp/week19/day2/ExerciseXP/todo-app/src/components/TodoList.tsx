import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);

  if (todos.length === 0) {
    return <p>No todos yet. Add one above!</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
}

export default TodoList;
