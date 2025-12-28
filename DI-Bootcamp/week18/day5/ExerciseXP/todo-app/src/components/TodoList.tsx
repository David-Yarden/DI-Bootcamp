import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { Todo } from '../store/reducer';
import TodoItem from './TodoItem';

interface StateProps {
  todos: Todo[];
}

function TodoList({ todos }: StateProps) {
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

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(TodoList);
