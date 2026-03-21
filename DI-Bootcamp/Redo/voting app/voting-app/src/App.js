import React, { useState } from 'react';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaSript', votes: 0 },
    { name: 'Java', votes: 0 },
  ]);

  const vote = (index) => {
    setLanguages((prev) =>
      prev.map((lang, i) =>
        i === index ? { ...lang, votes: lang.votes + 1 } : lang
      )
    );
  };

  return (
    <div className="container">
      <h1>Vote Your Language!</h1>
      <div className="card-list">
        {languages.map((lang, index) => (
          <div className="card" key={index}>
            <span className="votes">{lang.votes}</span>
            <span className="name">{lang.name}</span>
            <button className="vote-btn" onClick={() => vote(index)}>
              Click Here
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
