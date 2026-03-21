import { connect } from 'react-redux';
import { Task, toggleTask, editTask, deleteTask } from '../store/actions';
import { RootState, AppDispatch } from '../store/store';
import TaskItem from './TaskItem';

interface StateProps {
  tasks: Task[];
  selectedDate: string;
}

interface DispatchProps {
  toggleTask: (date: string, id: number) => void;
  editTask:   (date: string, id: number, text: string) => void;
  deleteTask: (date: string, id: number) => void;
}

type Props = StateProps & DispatchProps;

function TaskList({ tasks, selectedDate, toggleTask, editTask, deleteTask }: Props) {
  const formatted = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const done  = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-date-heading">{formatted}</h2>
        {total > 0 && (
          <span className="task-count">{done}/{total} done</span>
        )}
      </div>

      {total === 0 ? (
        <p className="empty-msg">No tasks for this day. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={(id)        => toggleTask(selectedDate, id)}
              onEdit={(id, text)    => editTask(selectedDate, id, text)}
              onDelete={(id)        => deleteTask(selectedDate, id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  tasks: state.tasksByDay[state.selectedDate] ?? [],
  selectedDate: state.selectedDate,
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  toggleTask: (date, id)        => dispatch(toggleTask(date, id)),
  editTask:   (date, id, text)  => dispatch(editTask(date, id, text)),
  deleteTask: (date, id)        => dispatch(deleteTask(date, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
