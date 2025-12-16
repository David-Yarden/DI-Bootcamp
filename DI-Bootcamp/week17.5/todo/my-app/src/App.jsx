import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ToDos, setToDos] = useState([])

  const addTask = () => {
    setToDos([...ToDos, "New Task"])
  }

  return (
    <>
      <h2>React memo / useCallback / useMemo </h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <ToDo/>
      </div>
    </>
  )
}

export default App