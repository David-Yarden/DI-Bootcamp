import { useState } from 'react'
import './App.css'
import Counter from './features/counter/Counter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Redux Toolkit - RTK</h2>
      <Counter />
    </>
  )
}

export default App
