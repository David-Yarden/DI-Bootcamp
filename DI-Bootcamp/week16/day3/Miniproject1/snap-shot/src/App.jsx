import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryPage category="mountains" />} />
        <Route path="/mountains" element={<CategoryPage category="mountains" />} />
        <Route path="/beaches" element={<CategoryPage category="beaches" />} />
        <Route path="/birds" element={<CategoryPage category="birds" />} />
        <Route path="/food" element={<CategoryPage category="food" />} />
        <Route path="/search/:term" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
