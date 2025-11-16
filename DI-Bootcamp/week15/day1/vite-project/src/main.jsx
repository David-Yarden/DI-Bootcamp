import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Hello from './Hello.jsx'
let element = <h2>My first JSX {1+1}</h2>;

createRoot(document.getElementById("root")).render(<App />);