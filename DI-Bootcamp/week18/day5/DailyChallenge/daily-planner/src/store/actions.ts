import { SET_SELECTED_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK } from './actionTypes';

export const setSelectedDate = (date: string) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const addTask = (date: string, text: string) => ({
  type: ADD_TASK,
  payload: {
    date,
    task: {
      id: Date.now(),
      text,
    },
  },
});

export const editTask = (date: string, id: number, text: string) => ({
  type: EDIT_TASK,
  payload: { date, id, text },
});

export const deleteTask = (date: string, id: number) => ({
  type: DELETE_TASK,
  payload: { date, id },
});
