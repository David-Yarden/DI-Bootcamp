import React from 'react';
import { useTaskContext } from './TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { state } = useTaskContext();

  const visible = state.tasks.filter((t) => {
    if (state.filter === 'active') return !t.completed;
    if (state.filter === 'completed') return t.completed;
    return true;
  });

  if (visible.length === 0) {
    return <p className="empty-msg">No tasks to show.</p>;
  }

  return (
    <ul className="task-list">
      {visible.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
