import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

// --- Shared Todo type ---
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// --- Action interfaces ---
export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number; // todo id
}

export interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: number; // todo id
}

export type TodoAction = AddTodoAction | ToggleTodoAction | RemoveTodoAction;

// --- Action creators ---
export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false },
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id: number): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: id,
});
