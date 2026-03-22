import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Task {
  id: number;
  title: string;
  categoryId: number;
  completed: boolean;
}

export interface Category {
  id: number;
  name: string;
}

interface TaskState {
  tasks: Task[];
  categories: Category[];
  selectedCategoryId: number | null;
}

const initialState: TaskState = {
  tasks: [
    { id: 1, title: "Complete project proposal", categoryId: 1, completed: false },
    { id: 2, title: "Review pull requests", categoryId: 1, completed: true },
    { id: 3, title: "Buy groceries", categoryId: 2, completed: false },
    { id: 4, title: "Go to gym", categoryId: 3, completed: false },
    { id: 5, title: "Read book chapter", categoryId: 2, completed: true },
  ],
  categories: [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Health" },
  ],
  selectedCategoryId: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; categoryId: number }>) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload.title,
        categoryId: action.payload.categoryId,
        completed: false,
      });
    },
    editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    editCategory: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const category = state.categories.find((c) => c.id === action.payload.id);
      if (category) {
        category.name = action.payload.name;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
      state.tasks = state.tasks.filter((t) => t.categoryId !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskComplete,
  addCategory,
  editCategory,
  deleteCategory,
  setSelectedCategory,
} = taskSlice.actions;

// Base selectors
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectCategories = (state: RootState) => state.tasks.categories;
export const selectSelectedCategoryId = (state: RootState) => state.tasks.selectedCategoryId;

// Memoized selectors
export const selectTasksByCategory = createSelector(
  [selectTasks, selectSelectedCategoryId],
  (tasks, categoryId) => {
    if (categoryId === null) return tasks;
    return tasks.filter((task) => task.categoryId === categoryId);
  }
);

export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed).length
);

export const selectCategoryById = createSelector(
  [selectCategories, (_state: RootState, categoryId: number) => categoryId],
  (categories, categoryId) => categories.find((c) => c.id === categoryId)
);

export const selectAllCategories = createSelector(
  [selectCategories],
  (categories) => categories
);

export default taskSlice.reducer;
