import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  addByVal,
  addByValPrepare,
  delayIncremetAsync,
} from "./counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.count);
  const status = useSelector((state) => state.counter.status);
  const dispatch = useDispatch();
  const num1Ref = useRef();
  const num2Ref = useRef();

  const increment5Sec = () => {
    setTimeout(() => {
      dispatch(increment());
    }, 5 * 1000);
  };

  return (
    <>
      <h2>Counter</h2>
      <h3>Count: {status === "loading" ? "loading..." : count}</h3>
      <button onClick={() => dispatch(increment())}> + </button>
      <button onClick={() => dispatch(decrement())}> - </button>
      <button onClick={() => dispatch(reset())}> Reset </button>
      <div>
        <input type='number' ref={num1Ref} />
        <input type='number' ref={num2Ref} />
        <button
          onClick={() =>
            dispatch(
              addByVal({ a: num1Ref.current.value, b: num2Ref.current.value })
            )
          }
        >
          Add By Input Value
        </button>
        <button onClick={() => dispatch(addByValPrepare(3, 5))}>
          Add By Input Prepare
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(delayIncremetAsync())}>
          Delay Async
        </button>
      </div>
    </>
  );
}
