import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store/store';
import { addTask } from '../store/actions';

interface StateProps {
  selectedDate: string;
}

interface DispatchProps {
  onAddTask: (date: string, text: string) => void;
}

type Props = StateProps & DispatchProps;

function AddTask({ selectedDate, onAddTask }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(selectedDate, text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task..."
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
        Add Task
      </button>
    </form>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onAddTask: (date: string, text: string) => dispatch(addTask(date, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
