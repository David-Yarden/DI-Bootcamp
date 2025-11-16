import "./App.css";
import Counter from "./components/counter.jsx";
import { useState } from "react";

function App() {
  // const [show, setShow] = useState(true);
  const handlSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input name="username"/>
        <select name="" id=""></select>
        <input type="checkbox" />
        <input type="submit" />
    </form>
      {/* <button onClick={() => setShow(!show)}>
        {show ? "Remove Counter" : "Show Counter"}
      </button>
      <h2>useEffect / class components / Rendering Error/ Forms </h2>
      {show ? <Counter /> : null}
      c */}
    </>
  );
}

export default App;