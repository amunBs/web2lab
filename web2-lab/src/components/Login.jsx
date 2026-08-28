import { useState } from 'react';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimId = identifier.trim();
    const trimPass = password.trim();

    if (!trimId || !trimPass) {
      setError('Please enter both your username/email and password.');
      return;
    }

    onLogin(trimId, trimPass, (errMessage) => {
      if (errMessage) {
        setError(errMessage);
      }
    });
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Sign In</h2>
        <p>Access your workspace & credentials</p>
      </div>

      {error && <div className="alert-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="login-identifier">
            Username or Email
          </label>
          <input
            id="login-identifier"
            type="text"
            className="form-input"
            placeholder="e.g. admin or alex@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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

        <button type="submit" className="btn-submit">
          Sign In
        </button>
      </form>

      <div className="auth-switch-footer">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="btn-link-switch"
          onClick={onSwitchToRegister}
        >
          Register new user
        </button>
      </div>
    </div>
  );
}
