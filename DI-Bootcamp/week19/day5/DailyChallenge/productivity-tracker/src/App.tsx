import './App.css'
import { useSelector } from 'react-redux'
import {
  selectTasksByCategory,
  selectCompletedTasks,
  selectSelectedCategoryId,
  selectAllCategories,
} from './store/taskSlice'
import CategorySelector from './components/CategorySelector'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

// Redux architecture:
//  store.ts           — configureStore with taskReducer (state.tasks)
//  taskSlice.ts       — createSlice: addTask/editTask/deleteTask/toggleTaskComplete/
//                       addCategory/editCategory/deleteCategory/setSelectedCategory
//                       createSelector selectors: selectTasksByCategory (filtered by selectedCategoryId),
//                       selectCompletedTasks, selectCategoryById, selectAllCategories,
//                       selectSelectedCategoryId
//  CategorySelector   — useSelector(selectAllCategories + selectSelectedCategoryId)
//                       useDispatch(setSelectedCategory)
//  AddTask            — useSelector(selectAllCategories), useDispatch(addTask), useCallback
//  TaskList           — useSelector(selectTasksByCategory)
//  TaskItem           — useSelector(selectCategoryById), useDispatch(editTask/deleteTask/toggleTaskComplete)
//                       useCallback for handleToggle, handleEdit, handleDelete

function App() {
  const selectedCategoryId = useSelector(selectSelectedCategoryId)
  const categories = useSelector(selectAllCategories)
  const visibleTasks = useSelector(selectTasksByCategory)
  const totalCompleted = useSelector(selectCompletedTasks)

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Productivity Tracker</h1>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        {selectedCategory ? `Category: ${selectedCategory.name}` : 'All Categories'} —{' '}
        {visibleTasks.length} task{visibleTasks.length !== 1 ? 's' : ''} visible,{' '}
        {totalCompleted} completed total
      </p>
      <CategorySelector />
      <AddTask />
      <TaskList />
    </div>
  )
}

export default App
