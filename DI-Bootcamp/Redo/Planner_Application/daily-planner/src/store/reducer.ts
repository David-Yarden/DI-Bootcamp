import { Task, PlannerAction } from './actions';
import { SET_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './actionTypes';

export interface PlannerState {
  selectedDate: string;                     // 'YYYY-MM-DD'
  tasksByDay: { [date: string]: Task[] };   // keyed by date string
}

const today = new Date().toISOString().split('T')[0];

const initialState: PlannerState = {
  selectedDate: today,
  tasksByDay: {
    [today]: [
      { id: 1, text: 'Review project notes', completed: false },
      { id: 2, text: 'Team standup', completed: true },
    ],
  },
};

function plannerReducer(
  state: PlannerState = initialState,
  action: PlannerAction
): PlannerState {
  switch (action.type) {
    case SET_DATE:
      return { ...state, selectedDate: action.payload };

    case ADD_TASK: {
      const { date, task } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [date]: [...(state.tasksByDay[date] ?? []), task],
        },
      };
    }

    case EDIT_TASK: {
      const { date, id, text } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [date]: (state.tasksByDay[date] ?? []).map((t) =>
            t.id === id ? { ...t, text } : t
          ),
        },
      };
    }

    case DELETE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [date]: (state.tasksByDay[date] ?? []).filter((t) => t.id !== id),
        },
      };
    }

    case TOGGLE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasksByDay: {
          ...state.tasksByDay,
          [date]: (state.tasksByDay[date] ?? []).map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        },
      };
    }

    default:
      return state;
  }
}

export default plannerReducer;
