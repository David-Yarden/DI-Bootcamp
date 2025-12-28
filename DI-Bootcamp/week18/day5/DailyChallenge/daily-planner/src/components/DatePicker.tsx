import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store/store';
import { setSelectedDate } from '../store/actions';

interface StateProps {
  selectedDate: string;
}

interface DispatchProps {
  onDateChange: (date: string) => void;
}

type Props = StateProps & DispatchProps;

function DatePicker({ selectedDate, onDateChange }: Props) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="date-picker" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Select Date:
      </label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
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

const mapStateToProps = (state: RootState): StateProps => ({
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onDateChange: (date: string) => dispatch(setSelectedDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
