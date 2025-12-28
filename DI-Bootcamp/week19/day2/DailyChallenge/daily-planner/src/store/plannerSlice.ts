import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  text: string;
}

interface PlannerState {
  tasks: Record<string, Task[]>;
  selectedDate: string;
}

const today = new Date().toISOString().split('T')[0];

const initialState: PlannerState = {
  tasks: {},
  selectedDate: today,
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action: PayloadAction<{ date: string; text: string }>) => {
      const { date, text } = action.payload;
      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }
      state.tasks[date].push({
        id: Date.now(),
        text,
      });
    },
    editTask: (state, action: PayloadAction<{ date: string; id: number; text: string }>) => {
      const { date, id, text } = action.payload;
      const task = state.tasks[date]?.find((t) => t.id === id);
      if (task) {
        task.text = text;
      }
    },
    deleteTask: (state, action: PayloadAction<{ date: string; id: number }>) => {
      const { date, id } = action.payload;
      if (state.tasks[date]) {
        state.tasks[date] = state.tasks[date].filter((t) => t.id !== id);
      }
    },
  },
});

export const { setSelectedDate, addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;
