import User from "./components/User";
import "./App.css";
// import users from "./users.json";
import { useEffect, useState } from "react";
import Counter from "./components/Counter";

// console.log(users);
/** uuid */

function App() {
  let [count, setCount] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [users, setUsers] = useState();

  useEffect(() => {
    if(count === 3){
      getUsers();
    }
  }, [count]);
  console.log(count);

  // const [a,b] = useState()
  // let count = 0;

  const echo = (msg) => {
    alert(msg);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.trim() == "") {
      setErrMsg("do not space me!");
    }
  };
  return (
    <div className="App">
      <h1>Welcome to React Props and State</h1>
      <input type="text" onChange={(e) => handleChange(e)} />
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
      <User a={1} name={"John"} b={echo} />
      <Counter />
    </div>
  );
}

export default App;