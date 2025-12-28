import { SET_SELECTED_DATE, ADD_TASK, EDIT_TASK, DELETE_TASK } from './actionTypes';

export interface Task {
  id: number;
  text: string;
}

export interface PlannerState {
  tasks: Record<string, Task[]>;
  selectedDate: string;
}

const today = new Date().toISOString().split('T')[0];

const initialState: PlannerState = {
  tasks: {},
  selectedDate: today,
};

interface Action {
  type: string;
  payload?: any;
}

const plannerReducer = (state = initialState, action: Action): PlannerState => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case ADD_TASK: {
      const { date, task } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: [...(state.tasks[date] || []), task],
        },
      };
    }
    case EDIT_TASK: {
      const { date, id, text } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date]?.map((task) =>
            task.id === id ? { ...task, text } : task
          ) || [],
        },
      };
    }
    case DELETE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date]?.filter((task) => task.id !== id) || [],
        },
      };
    }
    default:
      return state;
  }
};

export default plannerReducer;
