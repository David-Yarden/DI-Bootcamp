import { useTheme } from '../context/ThemeContext';

function ThemedContent() {
  const { theme } = useTheme();

  const styles = {
    container: {
      padding: '20px',
      marginTop: '20px',
      borderRadius: '8px',
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#444',
      color: theme === 'light' ? '#333' : '#fff',
      transition: 'all 0.3s ease',
    },
    heading: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Themed Content</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>
        This content automatically updates its styles based on the current theme
        using the useContext hook.
      </p>
    </div>
  );
}

export default ThemedContent;
