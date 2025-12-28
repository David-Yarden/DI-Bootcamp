import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedDate } from '../store/plannerSlice';

function DatePicker() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.planner.selectedDate);

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
    </div>
  );
}

export default DatePicker;
