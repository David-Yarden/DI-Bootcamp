import './App.css'
import DatePicker from './components/DatePicker'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Daily Planner</h1>
      <DatePicker />
      <AddTask />
      <TaskList />
    </div>
  )
}

export default App
