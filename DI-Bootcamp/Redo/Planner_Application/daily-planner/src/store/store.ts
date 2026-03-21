import { configureStore } from '@reduxjs/toolkit';
import plannerReducer, { PlannerState } from './reducer';

// --- localStorage persistence ---
function loadState(): PlannerState | undefined {
  try {
    const saved = localStorage.getItem('plannerState');
    return saved ? (JSON.parse(saved) as PlannerState) : undefined;
  } catch {
    return undefined;
  }
}

function saveState(state: PlannerState): void {
  try {
    localStorage.setItem('plannerState', JSON.stringify(state));
  } catch { /* ignore write errors */ }
}

const store = configureStore({
  reducer: plannerReducer,
  preloadedState: loadState(),
});

// Persist state to localStorage on every change
store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
