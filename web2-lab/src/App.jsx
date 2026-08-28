import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import './App.css';

const INITIAL_USERS = [
  {
    fullName: 'Alex Rivera',
    username: 'alexr',
    email: 'alex.rivera@example.com',
    password: 'password123',
    role: 'Lead Developer',
    createdAt: new Date().toISOString(),
    status: 'Active',
    securityLevel: 'High (Encrypted)',
  },
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('web2_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('web2_lab_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('web2_lab_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!currentUser);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Apply theme to document
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('web2_theme', theme);
    } catch (e) {
      console.error('Failed to set theme', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Persist users
  useEffect(() => {
    try {
      localStorage.setItem('web2_lab_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }, [users]);

  // Persist active session
  useEffect(() => {
    try {
      if (currentUser && isLoggedIn) {
        localStorage.setItem('web2_lab_active_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('web2_lab_active_user');
      }
    } catch (e) {
      console.error('Failed to save session', e);
    }
  }, [currentUser, isLoggedIn]);

  const handleLogin = (identifier, password, onError) => {
    const trimmedId = identifier.trim().toLowerCase();
    const trimmedPass = password.trim();

    const matched = users.find(
      (u) =>
        (u.username.toLowerCase() === trimmedId ||
          u.email.toLowerCase() === trimmedId) &&
        u.password === trimmedPass
    );

    if (matched) {
      setCurrentUser(matched);
      setIsLoggedIn(true);
      if (onError) onError('');
    } else {
      if (onError) {
        onError('Invalid username/email or password. If new, please register.');
      }
    }
  };

  const handleRegister = (newUser, callback) => {
    const exists = users.some(
      (u) =>
        u.username.toLowerCase() === newUser.username.toLowerCase() ||
        u.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (exists) {
      if (callback) callback('A user with this username or email already exists.');
      return;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto-login new user
    setTimeout(() => {
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      if (callback) callback('');
    }, 800);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthMode('login');
  };

  return (
    <>
      <Navbar
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-wrapper">
        {isLoggedIn && currentUser ? (
          <UserDashboard user={currentUser} onLogout={handleLogout} />
        ) : authMode === 'login' ? (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
