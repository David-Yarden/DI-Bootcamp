import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleTodo, removeTodo } from '../store/actions';

interface OwnProps {
  id: number;
  text: string;
  completed: boolean;
}

interface DispatchProps {
  onToggle: () => void;
  onRemove: () => void;
}

type Props = OwnProps & DispatchProps;

function TodoItem({ text, completed, onToggle, onRemove }: Props) {
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
        onChange={onToggle}
      />
      <span style={{
        textDecoration: completed ? 'line-through' : 'none',
        flex: 1
      }}>
        {text}
      </span>
      <button
        onClick={onRemove}
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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  onToggle: () => dispatch(toggleTodo(ownProps.id)),
  onRemove: () => dispatch(removeTodo(ownProps.id)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
