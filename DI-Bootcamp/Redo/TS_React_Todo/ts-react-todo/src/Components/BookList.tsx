// Daily Challenge: Book List application using generic List component + useState

import { useState } from 'react';
import { Book } from '../types/Book';
import List from './List';

const initialBooks: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
];

function BookList() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [year, setYear] = useState<string>('');

  function handleAdd() {
    if (!title.trim() || !author.trim() || !year.trim()) return;

    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      year: parseInt(year, 10),
    };

    setBooks((prev) => [...prev, newBook]);
    setTitle('');
    setAuthor('');
    setYear('');
  }

  function handleRemove(id: number) {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }

  return (
    <div className="card">
      <h2>Book List ({books.length})</h2>

      <List<Book>
        items={books}
        renderItem={(book) => (
          <span className="book-item">
            <strong>{book.title}</strong> by {book.author} ({book.year})
            <button
              className="remove-btn"
              onClick={() => handleRemove(book.id)}
            >
              Remove
            </button>
          </span>
        )}
      />

      <div className="add-book-form">
        <h3>Add a Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleAdd}>Add Book</button>
      </div>
    </div>
  );
}

export default BookList;
