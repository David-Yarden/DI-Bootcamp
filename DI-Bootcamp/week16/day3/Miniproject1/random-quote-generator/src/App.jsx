import { useState } from "react";
import quotes from "./quotes";

function App() {
  const getRandomQuote = (excludeIndex) => {
    let index;
    do {
      index = Math.floor(Math.random() * quotes.length);
    } while (index === excludeIndex);
    return { quote: quotes[index], index };
  };

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const initial = getRandomQuote(null);
  const [currentQuote, setCurrentQuote] = useState(initial.quote);
  const [currentIndex, setCurrentIndex] = useState(initial.index);
  const [color, setColor] = useState(randomColor());

  const changeQuote = () => {
    const next = getRandomQuote(currentIndex);
    setCurrentQuote(next.quote);
    setCurrentIndex(next.index);
    setColor(randomColor());
  };

    return (
  <div
    style={{
      backgroundColor: color,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      transition: "0.4s"
    }}
  >
    <div
      style={{
        background: "white",
        padding: "50px",
        width: "800px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 0 25px rgba(0,0,0,0.25)",
        transition: "0.3s"
      }}
    >
      <h1 style={{ color, fontSize: "32px", marginBottom: "20px" }}>
        {currentQuote.quote}
      </h1>

      <p style={{ fontSize: "20px", opacity: 0.8 }}>
        — {currentQuote.author || "Unknown"}
      </p>

      <button
        onClick={changeQuote}
        style={{
          marginTop: "40px",
          padding: "15px 30px",
          backgroundColor: color,
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          transition: "0.4s"
        }}
      >
        New Quote
      </button>
    </div>
  </div>
);
}
export default App;
