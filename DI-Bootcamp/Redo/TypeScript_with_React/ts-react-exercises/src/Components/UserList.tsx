// Exercise 5: useEffect Hook with TypeScript — fetch from API

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json() as Promise<User[]>;
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status">Loading users...</p>;
  if (error)   return <p className="status error">Error: {error}</p>;

  return (
    <div className="card">
      <h2>Users ({users.length})</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> &mdash; @{user.username}
            <br />
            <span>{user.email}</span> &middot; <span>{user.company.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
