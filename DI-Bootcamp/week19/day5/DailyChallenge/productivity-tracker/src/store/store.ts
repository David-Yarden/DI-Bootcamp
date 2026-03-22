import { configureStore } from '@reduxjs/toolkit';
// taskReducer comes from taskSlice.ts (createSlice + createSelector for memoized selectors)
import taskReducer from './taskSlice';

// Redux store — state shape:
// {
//   tasks: {
//     tasks: Task[],
//     categories: Category[],
//     selectedCategoryId: number | null
//   }
// }
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
