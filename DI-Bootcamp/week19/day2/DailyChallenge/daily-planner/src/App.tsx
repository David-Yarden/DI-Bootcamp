import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import DatePicker from './components/DatePicker'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

// Redux architecture:
//  store.ts         — configureStore with plannerReducer
//  plannerSlice.ts  — createSlice with setSelectedDate / addTask / editTask / deleteTask
//  DatePicker.tsx   — useDispatch(setSelectedDate) + useSelector(selectedDate)
//  AddTask.tsx      — useDispatch(addTask) with selectedDate from Redux state
//  TaskList.tsx     — useSelector to read tasks for the selected date
//  TaskItem.tsx     — useDispatch(editTask / deleteTask)

function App() {
  const selectedDate = useSelector((state: RootState) => state.planner.selectedDate)
  const taskCount = useSelector(
    (state: RootState) => (state.planner.tasks[selectedDate] ?? []).length
  )

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Daily Planner</h1>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        {selectedDate} — {taskCount} task{taskCount !== 1 ? 's' : ''} scheduled
      </p>
      <DatePicker />
      <AddTask />
      <TaskList />
    </div>
  )
}

export default App
