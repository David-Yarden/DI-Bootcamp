import React from 'react';
import Car from './Components/Car';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';
import './App.css';

const carinfo = { name: 'Ford', model: 'Mustang' };

function App() {
  return (
    <div style={{ padding: '20px' }}>

      {/* ── Exercise 1: Car & Garage ───────────────────────── */}
      <h2>Exercise 1:</h2>
      <Car model={carinfo.model} />

      <hr />

      {/* ── Exercise 2: Events ────────────────────────────── */}
      <h2>Exercise 2:</h2>
      <Events />

      <hr />

      {/* ── Exercise 3: Phone ─────────────────────────────── */}
      <h2>Exercise 3:</h2>
      <Phone />

      <hr />

      {/* ── Exercise 4: Color + useEffect ─────────────────── */}
      <h2>Exercise 4:</h2>
      <Color />

    </div>
  );
}

export default App;
