import { useState } from 'react';
import { Book } from '../types/Book';
import List from './List';

function BookApp() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ]);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');

  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      const newBook: Book = {
        id: Date.now(),
        title: newTitle.trim(),
        author: newAuthor.trim(),
      };
      setBooks([...books, newBook]);
      setNewTitle('');
      setNewAuthor('');
    }
  };

  const renderBook = (book: Book) => (
    <div style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <strong>{book.title}</strong>
      <br />
      <span style={{ color: '#666' }}>by {book.author}</span>
    </div>
  );

  return (
    <div>
      <h1>Book List</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: '8px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={{ marginRight: '8px', padding: '8px' }}
        />
        <button onClick={addBook} style={{ padding: '8px 16px' }}>
          Add Book
        </button>
      </div>

      <List items={books} renderItem={renderBook} />
    </div>
  );
}

export default BookApp;
