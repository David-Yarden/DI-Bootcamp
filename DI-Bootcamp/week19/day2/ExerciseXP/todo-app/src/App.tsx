import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

// Redux architecture:
//  store.ts       — configureStore with todoReducer
//  todoSlice.ts   — createSlice with addTodo / toggleTodo / removeTodo actions
//  AddTodo.tsx    — useDispatch to dispatch addTodo
//  TodoList.tsx   — useSelector to read todos from Redux state
//  TodoItem.tsx   — useDispatch to dispatch toggleTodo / removeTodo

function App() {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo List</h1>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        {completedCount} / {todos.length} completed
      </p>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
