import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemedContent from './components/ThemedContent';
import './App.css';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className="app"
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#333' : '#fff',
        transition: 'all 0.3s ease',
        padding: '40px',
      }}
    >
      <h1>Theme Switcher</h1>
      <ThemeSwitcher />
      <ThemedContent />
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
