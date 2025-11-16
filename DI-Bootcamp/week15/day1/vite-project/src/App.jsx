import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hello from './Hello'
import User from './components/features/User'
import './components/features/user.css'

function App() {
  const [count, setCount] = useState(0)

  const users = [
    { name: 'Alice', email: 'alice@email.com' },
    { name: 'Bob', email: 'bob@email.com' },
    { name: 'Charlie', email: 'charlie@email.com' }
  ]

  return (
    <>
      <h2>Components / Props / CSS</h2>
      {users.map((item, index) => (
        <User key={index} name={item.name} email={item.email} />
      ))}
      <User name="John" email="jjj@gmail.com" />
      <User name="Ann" email="aaa@gmail.com" />
      <Hello />
      <Hello />
      <Hello />
    </>
  )
}


export default App
