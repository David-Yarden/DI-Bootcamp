import React from 'react';
import { useTaskContext } from './TaskContext';

const FILTERS = ['all', 'active', 'completed'];

function FilterBar() {
  const { state, dispatch } = useTaskContext();

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={state.filter === f ? 'active' : ''}
          onClick={() => dispatch({ type: 'FILTER_TASKS', payload: f })}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
