import './App.css'
import UserCard from './components/UserCard'

function App() {
  return (
    <>
      <h1>Optional Props Example</h1>
      <UserCard name="John Doe" age={30} role="Admin" />
      <UserCard name="Jane Smith" age={25} />
      <UserCard name="Bob" />
      <UserCard />
    </>
  )
}

export default App
