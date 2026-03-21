import { useRef } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../store/actions';
import { AppDispatch } from '../store/store';

interface DispatchProps {
  addTodo: (text: string) => void;
}

function AddTodo({ addTodo }: DispatchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (): void => {
    const text = inputRef.current?.value.trim();
    if (!text) return;
    addTodo(text);
    inputRef.current!.value = '';
    inputRef.current!.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="add-todo">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  addTodo: (text: string) => dispatch(addTodo(text)),
});

export default connect(null, mapDispatchToProps)(AddTodo);
