import { useSelector } from 'react-redux';
// selectTasksByCategory is a memoized createSelector that filters by selectedCategoryId in Redux state
// selectCompletedTasks is a memoized createSelector that counts completed tasks across all tasks
import { selectTasksByCategory } from '../store/taskSlice';
import TaskItem from './TaskItem';

function TaskList() {
  // Tasks are filtered by the category stored in Redux (set by CategorySelector via setSelectedCategory)
  const tasks = useSelector(selectTasksByCategory);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <div style={{ marginBottom: '10px', color: '#666' }}>
        Completed: {completedCount} / {tasks.length} tasks shown
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
