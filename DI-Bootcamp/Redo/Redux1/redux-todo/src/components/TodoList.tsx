import { connect } from 'react-redux';
import { Todo, toggleTodo, removeTodo } from '../store/actions';
import { RootState, AppDispatch } from '../store/store';
import TodoItem from './TodoItem';

interface StateProps {
  todos: Todo[];
}

interface DispatchProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

type Props = StateProps & DispatchProps;

function TodoList({ todos, toggleTodo, removeTodo }: Props) {
  if (todos.length === 0) {
    return <p className="empty-msg">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
    </ul>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  toggleTodo: (id: number) => dispatch(toggleTodo(id)),
  removeTodo:  (id: number) => dispatch(removeTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
