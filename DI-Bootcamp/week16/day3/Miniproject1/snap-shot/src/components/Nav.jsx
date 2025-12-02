import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (term.trim() !== "") navigate(`/search/${term}`);
  };

  return (
    <div className="nav">
      <div className="categories">
        <Link to="/mountains">Mountains</Link>
        <Link to="/beaches">Beaches</Link>
        <Link to="/birds">Birds</Link>
        <Link to="/food">Food</Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
