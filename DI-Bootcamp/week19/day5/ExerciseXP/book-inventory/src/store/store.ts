import { configureStore } from '@reduxjs/toolkit';
// bookReducer is the slice reducer from bookSlice.ts (createSlice + createSelector)
import bookReducer from './bookSlice';

// Redux store — state shape: { books: BookState }
// BookState = { books: Book[], selectedGenre: string }
export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
