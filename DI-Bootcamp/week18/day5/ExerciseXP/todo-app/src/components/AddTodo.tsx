import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTodo } from '../store/actions';

interface DispatchProps {
  onAddTodo: (text: string) => void;
}

function AddTodo({ onAddTodo }: DispatchProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo..."
        style={{
          padding: '8px',
          marginRight: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '250px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onAddTodo: (text: string) => dispatch(addTodo(text)),
});

export default connect(null, mapDispatchToProps)(AddTodo);
