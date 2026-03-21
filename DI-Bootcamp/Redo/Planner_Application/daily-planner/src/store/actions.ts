import { SET_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './actionTypes';

// --- Shared types ---
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// --- Action interfaces ---
export interface SetDateAction    { type: typeof SET_DATE;    payload: string; }
export interface AddTaskAction    { type: typeof ADD_TASK;    payload: { date: string; task: Task }; }
export interface EditTaskAction   { type: typeof EDIT_TASK;   payload: { date: string; id: number; text: string }; }
export interface DeleteTaskAction { type: typeof DELETE_TASK; payload: { date: string; id: number }; }
export interface ToggleTaskAction { type: typeof TOGGLE_TASK; payload: { date: string; id: number }; }

export type PlannerAction =
  | SetDateAction
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | ToggleTaskAction;

// --- Action creators ---
export const setDate = (date: string): SetDateAction => ({
  type: SET_DATE,
  payload: date,
});

export const addTask = (date: string, text: string): AddTaskAction => ({
  type: ADD_TASK,
  payload: { date, task: { id: Date.now(), text, completed: false } },
});

export const editTask = (date: string, id: number, text: string): EditTaskAction => ({
  type: EDIT_TASK,
  payload: { date, id, text },
});

export const deleteTask = (date: string, id: number): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: { date, id },
});

export const toggleTask = (date: string, id: number): ToggleTaskAction => ({
  type: TOGGLE_TASK,
  payload: { date, id },
});
