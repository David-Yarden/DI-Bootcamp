import './App.css'
import CategorySelector from './components/CategorySelector'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Productivity Tracker</h1>
      <CategorySelector />
      <AddTask />
      <TaskList />
    </div>
  )
}

export default App
