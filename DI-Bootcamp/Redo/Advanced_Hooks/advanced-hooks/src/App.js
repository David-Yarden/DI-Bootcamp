import React, { useContext } from 'react';
import './App.css';
import { ThemeProvider, ThemeContext } from './Components/ThemeContext';
import ThemeSwitcher from './Components/ThemeSwitcher';
import CharacterCounter from './Components/CharacterCounter';

function AppContent() {
  const { theme } = useContext(ThemeContext);

  const themeStyles =
    theme === 'light'
      ? { backgroundColor: '#ffffff', color: '#333333' }
      : { backgroundColor: '#333333', color: '#ffffff' };

  return (
    <div
      style={{
        ...themeStyles,
        transition: 'background-color 0.3s, color 0.3s',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <h1>Advanced Hooks</h1>
      <p>Current theme: <strong>{theme}</strong></p>

      {/* ── Exercise 1: Theme Switcher ── */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Exercise 1: Theme Switcher (useContext + useState)</h2>
        <ThemeSwitcher />
      </section>

      {/* ── Exercise 2: Character Counter ── */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Exercise 2: Character Counter (useRef)</h2>
        <CharacterCounter />
      </section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
