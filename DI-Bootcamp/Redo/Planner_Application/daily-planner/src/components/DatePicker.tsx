import { connect } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDate } from '../store/actions';

interface StateProps    { selectedDate: string; }
interface DispatchProps { setDate: (date: string) => void; }
type Props = StateProps & DispatchProps;

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Returns the 7 days of the ISO week containing dateStr
function getWeekDays(dateStr: string): string[] {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0 = Sun
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

function DatePicker({ selectedDate, setDate }: Props) {
  const weekDays = getWeekDays(selectedDate);

  const shiftWeek = (delta: number): void => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta * 7);
    setDate(d.toISOString().split('T')[0]);
  };

  const monthYear = new Date(selectedDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button className="nav-btn" onClick={() => shiftWeek(-1)}>&#8249;</button>
        <span className="month-label">{monthYear}</span>
        <button className="nav-btn" onClick={() => shiftWeek(1)}>&#8250;</button>
      </div>

      <div className="week-row">
        {weekDays.map((day, i) => (
          <button
            key={day}
            className={`day-btn${day === selectedDate ? ' active' : ''}`}
            onClick={() => setDate(day)}
          >
            <span className="day-label">{DAY_LABELS[i]}</span>
            <span className="day-num">{day.slice(-2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setDate: (date: string) => dispatch(setDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
