import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { Task } from '../store/reducer';
import TaskItem from './TaskItem';

interface StateProps {
  tasks: Task[];
  selectedDate: string;
}

function TaskList({ tasks, selectedDate }: StateProps) {
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <h2>Tasks for {formattedDate}</h2>
      {tasks.length === 0 ? (
        <p>No tasks for this day. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} text={task.text} />
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  tasks: state.tasks[state.selectedDate] || [],
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(TaskList);
