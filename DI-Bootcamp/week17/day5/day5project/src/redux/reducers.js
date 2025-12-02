export const ACTION_INCREMENT = 'increment';
export const ACTION_DECREMENT = 'decrement';
export const ACTION_BY_VAL = 'incrementByValue';

const initialState = { 
    count: 0 ,
};

export const counterReducer = (state = initialState, action) =>{
    // if (action.type === 'increment') {
    //     return {...state, count: state.count + 1};
    // }
    // else if (action.type === 'decrement') {
    //     return {...state, count: state.count - 1};
    // }
    // return state;
    switch (action.type) {
        case ACTION_INCREMENT:
            return {...state, count: state.count + 1};
        case ACTION_DECREMENT:
            return {...state, count: state.count - 1};
        case ACTION_BY_VAL:
            return {...state, count: state.count + Number(action.payload)};
        default:
            return state;
    }
}
