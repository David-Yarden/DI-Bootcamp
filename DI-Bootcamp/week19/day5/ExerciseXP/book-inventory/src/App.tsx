import './App.css'
import BookList from './components/BookList'

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Book Inventory</h1>
      <BookList />
    </div>
  )
}

export default App
