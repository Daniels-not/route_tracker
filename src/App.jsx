import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import { getCurrentUser } from './func/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Fetch Current User Error:', error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/signin'} />} />
        <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
