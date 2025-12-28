import { TaskProvider } from './context/TaskContext';
import AddTask from './components/AddTask';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Enhanced Task Manager</h1>
        <p className="subtitle">Using useContext, useReducer, and useRef</p>
        <AddTask />
        <TaskFilter />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
