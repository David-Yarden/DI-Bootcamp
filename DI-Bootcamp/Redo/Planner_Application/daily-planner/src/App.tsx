import { Provider } from 'react-redux';
import store from './store/store';
import DatePicker from './components/DatePicker';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>Daily Planner</h1>
        </header>

        {/* ── Calendar / Date Picker ── */}
        <DatePicker />

        {/* ── Add Task ── */}
        <AddTask />

        {/* ── Task List for selected day ── */}
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
