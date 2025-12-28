import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';

function TaskList() {
  const selectedDate = useSelector((state: RootState) => state.planner.selectedDate);
  const tasks = useSelector((state: RootState) => state.planner.tasks[selectedDate] || []);

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
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              date={selectedDate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
