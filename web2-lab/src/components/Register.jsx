import { useState } from 'react';

export default function Register({ onRegister, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimName = fullName.trim();
    const trimEmail = email.trim().toLowerCase();
    const trimUsername = username.trim().toLowerCase();
    const trimPass = password.trim();
    const trimConfirm = confirmPassword.trim();

    if (!trimName || !trimEmail || !trimUsername || !trimPass || !trimConfirm) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (trimPass.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (trimPass !== trimConfirm) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      fullName: trimName,
      email: trimEmail,
      username: trimUsername,
      password: trimPass,
      role: 'Member',
      createdAt: new Date().toISOString(),
      status: 'Active',
      securityLevel: 'High (Encrypted)',
    };

    onRegister(newUser, (errMessage) => {
      if (errMessage) {
        setError(errMessage);
      } else {
        setSuccess('Account created successfully! Redirecting...');
      }
    });
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Register a new user to access credentials and tools</p>
      </div>

      {error && <div className="alert-error">⚠️ {error}</div>}
      {success && <div className="alert-success">✅ {success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-name">
            Full Name
          </label>
          <input
            id="reg-name"
            type="text"
            className="form-input"
            placeholder="e.g. Alex Rivera"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            className="form-input"
            placeholder="e.g. alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-username">
            Username
          </label>
          <input
            id="reg-username"
            type="text"
            className="form-input"
            placeholder="e.g. alexr"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoCapitalize="none"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-password">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-confirm">
            Confirm Password
          </label>
          <input
            id="reg-confirm"
            type={showPassword ? 'text' : 'password'}
            className="form-input"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn-submit">
          Register User
        </button>
      </form>

      <div className="auth-switch-footer">
        Already have an account?{' '}
        <button
          type="button"
          className="btn-link-switch"
          onClick={onSwitchToLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
