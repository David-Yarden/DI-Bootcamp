import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { filteredTasks, state } = useTaskContext();

  if (filteredTasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
        {state.tasks.length === 0
          ? 'No tasks yet. Add one above!'
          : 'No tasks match the current filter.'}
      </div>
    );
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <div style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
        Showing {filteredTasks.length} of {state.tasks.length} tasks
      </div>
    </div>
  );
}

export default TaskList;
