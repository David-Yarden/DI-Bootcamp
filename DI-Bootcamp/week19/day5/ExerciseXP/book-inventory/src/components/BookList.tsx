import { useSelector, useDispatch } from 'react-redux';
import {
  selectBooksByGenre,
  selectSelectedGenre,
  setSelectedGenre,
} from '../store/bookSlice';

const genres = ['All', 'Horror', 'Fantasy', 'Science Fiction'];

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksByGenre);
  const selectedGenre = useSelector(selectSelectedGenre);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => dispatch(setSelectedGenre(genre))}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              marginBottom: '8px',
              backgroundColor: selectedGenre === genre ? '#4CAF50' : '#ddd',
              color: selectedGenre === genre ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <h2>
        {selectedGenre === 'All' ? 'All Books' : `${selectedGenre} Books`} ({books.length})
      </h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map((book) => (
          <li
            key={book.id}
            style={{
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              borderLeft: '4px solid #4CAF50',
            }}
          >
            <strong>{book.title}</strong>
            <br />
            <span style={{ color: '#666' }}>by {book.author}</span>
            <br />
            <span
              style={{
                display: 'inline-block',
                marginTop: '4px',
                padding: '2px 8px',
                backgroundColor: '#e0e0e0',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {book.genre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
