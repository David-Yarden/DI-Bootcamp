import React from 'react';
import './App.css';
import { TaskProvider } from './Components/TaskContext';
import AddTask from './Components/AddTask';
import FilterBar from './Components/FilterBar';
import TaskList from './Components/TaskList';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Enhanced Task Manager</h1>

        {/* ── Add new task ── */}
        <AddTask />

        {/* ── Filter bar ── */}
        <FilterBar />

        {/* ── Task list ── */}
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
