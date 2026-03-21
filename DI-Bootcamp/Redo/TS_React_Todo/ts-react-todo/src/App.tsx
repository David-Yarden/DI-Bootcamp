import './App.css'
import Greeting from './Components/Greeting'
import Counter from './Components/Counter'
import UserCard from './Components/UserCard'
import UserList from './Components/UserList'

function App() {
  return (
    <div className="app-container">
      <h1>TypeScript with React — Exercises</h1>

      {/* ── Exercise 2: Greeting component with typed props ── */}
      <section>
        <h2>Exercise 2: Greeting</h2>
        <Greeting name="Alice" messageCount={5} />
        <Greeting name="Bob" messageCount={1} />
      </section>

      {/* ── Exercise 3: Counter with useState + TypeScript ── */}
      <section>
        <h2>Exercise 3: Counter</h2>
        <Counter />
      </section>

      {/* ── Exercise 4: UserCard with optional props ── */}
      <section>
        <h2>Exercise 4: UserCard (optional props)</h2>
        <UserCard name="Carol" age={28} role="Admin" />
        <UserCard name="Dave" />
        <UserCard />
      </section>

      {/* ── Exercise 5: UserList with useEffect + API fetch ── */}
      <section>
        <h2>Exercise 5: UserList (useEffect + API)</h2>
        <UserList />
      </section>
    </div>
  )
}

export default App
