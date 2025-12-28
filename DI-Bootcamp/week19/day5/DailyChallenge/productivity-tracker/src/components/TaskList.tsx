import { useSelector } from 'react-redux';
import { selectTasksByCategory, selectCompletedTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = useSelector(selectTasksByCategory);
  const completedCount = useSelector(selectCompletedTasks);

  return (
    <div>
      <div style={{ marginBottom: '10px', color: '#666' }}>
        Completed: {completedCount} / {tasks.length} tasks
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              categoryId={task.categoryId}
              completed={task.completed}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
