import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { selectBooksByGenre, selectSelectedGenre } from './store/bookSlice'
import BookList from './components/BookList'

// Redux architecture:
//  store.ts      — configureStore with bookReducer (state.books)
//  bookSlice.ts  — createSlice with setSelectedGenre action + createSelector selectors:
//                  selectBooks, selectSelectedGenre, selectBooksByGenre (memoized),
//                  selectHorrorBooks, selectFantasyBooks, selectScienceFictionBooks
//  BookList.tsx  — useSelector(selectBooksByGenre) + useDispatch(setSelectedGenre)

function App() {
  const selectedGenre = useSelector((state: RootState) => selectSelectedGenre(state))
  const visibleBooks = useSelector((state: RootState) => selectBooksByGenre(state))

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Book Inventory</h1>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        Showing <strong>{visibleBooks.length}</strong> book{visibleBooks.length !== 1 ? 's' : ''}{' '}
        {selectedGenre !== 'All' ? `in "${selectedGenre}"` : 'across all genres'}
      </p>
      <BookList />
    </div>
  )
}

export default App
