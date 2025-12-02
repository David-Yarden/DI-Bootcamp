import { ACTION_INCREMENT, ACTION_DECREMENT, ACTION_BY_VAL } from "./reducers";

export const increment = () => {
    return {
        type: ACTION_INCREMENT
    }
}

export const decrement = () => {
    return {
        type: ACTION_DECREMENT
    }
} 

export const incrementByVal = (val) => {
    return {
        type: ACTION_BY_VAL,
        payload: val,
    }
}