import { legacy_createStore as createStore } from 'redux';
import plannerReducer from './reducer';

const store = createStore(plannerReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
