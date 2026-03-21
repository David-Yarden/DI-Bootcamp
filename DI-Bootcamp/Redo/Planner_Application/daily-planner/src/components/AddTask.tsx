import { useRef } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../store/actions';
import { RootState, AppDispatch } from '../store/store';

interface StateProps    { selectedDate: string; }
interface DispatchProps { addTask: (date: string, text: string) => void; }
type Props = StateProps & DispatchProps;

function AddTask({ selectedDate, addTask }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (): void => {
    const text = inputRef.current?.value.trim();
    if (!text) return;
    addTask(selectedDate, text);
    inputRef.current!.value = '';
    inputRef.current!.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="add-task">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a task for this day..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  addTask: (date, text) => dispatch(addTask(date, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
