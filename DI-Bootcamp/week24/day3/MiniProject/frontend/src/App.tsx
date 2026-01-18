import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { setCredentials } from './features/auth/authSlice';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StoryViewer from './pages/StoryViewer';
import CreateStory from './pages/CreateStory';

function App() {
  const dispatch = useAppDispatch();

  // Try to restore auth state on app load
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setCredentials({
            user: data.user,
            accessToken: data.accessToken
          }));
        }
      } catch (error) {
        // Silent fail - user just needs to login
      }
    };

    restoreAuth();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/story/:id"
              element={
                <ProtectedRoute>
                  <StoryViewer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateStory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
