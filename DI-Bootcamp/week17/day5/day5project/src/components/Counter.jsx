import { useRef } from "react";
import { connect } from "react-redux";
import { increment, decrement, incrementByVal } from "../redux/actions";

const Counter = (props) => {
  const inputRef = useRef();
  const { count, dispatch } = props;

  return (
    <>
      <h2>Counter</h2>
      <h3>Count = {count}</h3>

      <button onClick={() => dispatch(increment())}> + </button>
      <button onClick={() => dispatch(decrement())}> - </button>

      <div>
        <input ref={inputRef} type="number" />
        <button onClick={() => dispatch(incrementByVal(Number(inputRef.current.value)))}> 
          + input value
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
});
const mapDispatchToProps = (dispatch) => {
    return{
        a: () => dispatch(increment()),
    }
};

export default connect(mapStateToProps)(Counter);
