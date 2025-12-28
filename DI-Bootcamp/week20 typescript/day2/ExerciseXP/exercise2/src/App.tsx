import './App.css'
import Greeting from './components/Greeting'

function App() {
  return (
    <>
      <Greeting name="Alice" messageCount={5} />
      <Greeting name="Bob" messageCount={1} />
      <Greeting name="Charlie" messageCount={0} />
    </>
  )
}

export default App
