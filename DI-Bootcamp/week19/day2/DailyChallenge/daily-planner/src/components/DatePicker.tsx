import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedDate } from '../store/plannerSlice';

// DatePicker is connected to Redux:
//   - reads selectedDate and the task list for that date from the store
//   - dispatches setSelectedDate when the user picks a new date
function DatePicker() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.planner.selectedDate);
  const taskCount = useSelector(
    (state: RootState) => (state.planner.tasks[selectedDate] ?? []).length
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(e.target.value));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="date-picker" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Select Date:
      </label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={handleDateChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      {taskCount > 0 && (
        <span style={{
          marginLeft: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '12px',
          padding: '2px 10px',
          fontSize: '14px'
        }}>
          {taskCount} task{taskCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}

export default DatePicker;
