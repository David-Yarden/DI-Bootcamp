import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

interface BookState {
  books: Book[];
  selectedGenre: string;
}

const initialState: BookState = {
  books: [
    { id: 1, title: "Dracula", author: "Bram Stoker", genre: "Horror" },
    { id: 2, title: "The Shining", author: "Stephen King", genre: "Horror" },
    { id: 3, title: "It", author: "Stephen King", genre: "Horror" },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { id: 5, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" },
    { id: 6, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy" },
    { id: 7, title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
    { id: 8, title: "1984", author: "George Orwell", genre: "Science Fiction" },
    { id: 9, title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction" },
  ],
  selectedGenre: 'All',
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { setSelectedGenre } = bookSlice.actions;

// Selectors
export const selectBooks = (state: RootState) => state.books.books;
export const selectSelectedGenre = (state: RootState) => state.books.selectedGenre;

export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Horror')
);

export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Fantasy')
);

export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Science Fiction')
);

export const selectBooksByGenre = createSelector(
  [selectBooks, selectSelectedGenre],
  (books, genre) => {
    if (genre === 'All') return books;
    return books.filter((book) => book.genre === genre);
  }
);

export default bookSlice.reducer;
