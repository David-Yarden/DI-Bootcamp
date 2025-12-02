import "./App.css";
import { useState, useReducer } from "react";

const initialState = { count: 5 };

const reducerCounter = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducerCounter, initialState);

  return (
    <>
      <h2>useReducer</h2>

      <div>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Count = {count}
        </button>
      </div>

      <div>
        <h2>useReducer State: {state.count}</h2>

        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      </div>
    </>
  );
}

export default App;
