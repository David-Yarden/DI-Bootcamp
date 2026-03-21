import { Todo, TodoAction } from './actions';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes';

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
  ],
};

function todoReducer(state: TodoState = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export default todoReducer;
