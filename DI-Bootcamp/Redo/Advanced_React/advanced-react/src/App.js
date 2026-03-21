import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ErrorBoundary from './components/ErrorBoundary';
import PostList from './components/PostList';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';

// ── Exercise 1: Route screens ────────────────────────────────────────────────

function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile Screen</h1>;
}

function ShopScreen() {
  throw new Error('Shop crashed!');
}

// ── Exercise 4: POST to webhook ──────────────────────────────────────────────

// Replace this with your own webhook.site unique URL
const WEBHOOK_URL = 'https://webhook.site/your-unique-url';

async function postData() {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'no-cors',
    body: JSON.stringify({
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27,
    }),
  });
  console.log('Response', response);
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <BrowserRouter>
      <div className="container py-3">

        {/* ── Exercise 1: Navbar + Router ──────────────────── */}
        <nav className="navbar navbar-expand navbar-light bg-light mb-4 px-3">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">Shop</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <ErrorBoundary><HomeScreen /></ErrorBoundary>
          } />
          <Route path="/profile" element={
            <ErrorBoundary><ProfileScreen /></ErrorBoundary>
          } />
          <Route path="/shop" element={
            <ErrorBoundary><ShopScreen /></ErrorBoundary>
          } />
        </Routes>

        <hr />

        {/* ── Exercise 2: PostList ─────────────────────────── */}
        <PostList />

        <hr />

        {/* ── Exercise 3: JSON parse ───────────────────────── */}
        <h4>Example1 – Social Medias</h4>
        <Example1 />

        <h4 className="mt-3">Example2 – Skills</h4>
        <Example2 />

        <h4 className="mt-3">Example3 – Experiences</h4>
        <Example3 />

        <hr />

        {/* ── Exercise 4: POST button ──────────────────────── */}
        <button onClick={postData}>Press me to post some data</button>

      </div>
    </BrowserRouter>
  );
}

export default App;
