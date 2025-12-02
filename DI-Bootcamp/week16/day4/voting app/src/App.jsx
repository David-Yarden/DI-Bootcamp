import { useState } from "react";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 2 },
    { name: "Python", votes: 4 },
    { name: "JavaScript", votes: 5 },
    { name: "Java", votes: 1 }
  ]);

  const addVote = (index) => {
    const updated = [...languages];
    updated[index].votes++;
    setLanguages(updated);
  };

  return (
    <div className="container">
      <h1>Vote Your Language!</h1>

      {languages.map((lang, index) => (
        <div className="row" key={index}>
          <span className="votes">{lang.votes}</span>
          <span className="name">{lang.name}</span>
          <span
            className="click"
            onClick={() => addVote(index)}
          >
            Click Here
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
