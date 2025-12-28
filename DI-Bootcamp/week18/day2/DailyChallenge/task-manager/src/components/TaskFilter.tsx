import { useTaskContext } from '../context/TaskContext';

function TaskFilter() {
  const { state, dispatch } = useTaskContext();

  const filters: Array<{ value: 'all' | 'active' | 'completed'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: filter.value })}
          style={{
            padding: '8px 16px',
            margin: '0 5px',
            fontSize: '14px',
            backgroundColor: state.filter === filter.value ? '#2196F3' : '#e0e0e0',
            color: state.filter === filter.value ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
