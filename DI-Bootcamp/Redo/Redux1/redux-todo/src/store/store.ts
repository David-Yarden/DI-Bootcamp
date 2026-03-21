import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducer';

// configureStore is the modern replacement for createStore (no legacy_createStore needed)
const store = configureStore({
  reducer: todoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
