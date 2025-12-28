import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store/store';
import { editTask, deleteTask } from '../store/actions';

interface OwnProps {
  id: number;
  text: string;
}

interface StateProps {
  selectedDate: string;
}

interface DispatchProps {
  onEdit: (date: string, id: number, text: string) => void;
  onDelete: (date: string, id: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function TaskItem({ id, text, selectedDate, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(selectedDate, id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(selectedDate, id);
  };

  if (isEditing) {
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
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{ flex: 1, padding: '4px' }}
        />
        <button onClick={handleEdit} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
          Save
        </button>
        <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#888', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
          Cancel
        </button>
      </li>
    );
  }

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
      <span style={{ flex: 1 }}>{text}</span>
      <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
        Delete
      </button>
    </li>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onEdit: (date: string, id: number, text: string) => dispatch(editTask(date, id, text)),
  onDelete: (date: string, id: number) => dispatch(deleteTask(date, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
