import { useState } from 'react';

export default function UserDashboard({ user, onLogout }) {
  const [showPassword, setShowPassword] = useState(false);

  const getInitials = () => {
    if (user?.fullName && user.fullName.trim()) {
      const parts = user.fullName.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return user.fullName.slice(0, 2).toUpperCase();
    }
    return (user?.username || 'U').slice(0, 2).toUpperCase();
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Active Member';

  return (
    <div className="dashboard-grid">
      {/* Hero Welcome Card */}
      <div className="dashboard-hero-card">
        <div className="dashboard-hero-left">
          <div className="user-avatar-circle">{getInitials()}</div>
          <div className="hero-user-details">
            <h2>Welcome, {user?.fullName || user?.username}!</h2>
            <p className="hero-user-sub">
              @{user?.username} • Signed in successfully
            </p>
          </div>
        </div>

        <button type="button" className="btn-hero-logout" onClick={onLogout}>
          Sign Out
        </button>
      </div>

      {/* User Credentials and Account Status Row */}
      <div className="dashboard-cards-row">
        {/* Credentials Card */}
        <div className="credentials-card">
          <div className="card-header-title">
            <h3>User Credentials</h3>
            <span className="badge-status-pill badge-verified">Verified</span>
          </div>

          <div className="data-rows-list">
            <div className="data-row-item">
              <span className="data-row-label">Full Name</span>
              <span className="data-row-value">{user?.fullName || 'N/A'}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Username</span>
              <span className="data-row-value">@{user?.username}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Email Address</span>
              <span className="data-row-value">{user?.email}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Account Password</span>
              <div className="data-row-value">
                <span>{showPassword ? user?.password : '••••••••••••'}</span>
                <button
                  type="button"
                  className="password-reveal-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Reveal'}
                </button>
              </div>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Account ID</span>
              <span className="data-row-value" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                USR-{Math.abs((user?.username || '').split('').reduce((a, b) => a + b.charCodeAt(0), 1000))}
              </span>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="status-card">
          <div className="card-header-title">
            <h3>Account & Session Status</h3>
            <span className="badge-status-pill badge-active">
              <span className="status-indicator-dot"></span>
              Live Session
            </span>
          </div>

          <div className="data-rows-list">
            <div className="data-row-item">
              <span className="data-row-label">Authentication Status</span>
              <span className="data-row-value" style={{ color: 'var(--success-color)' }}>
                ● Logged In (Authenticated)
              </span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Account Role</span>
              <span className="data-row-value">{user?.role || 'Standard Member'}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Security Protocol</span>
              <span className="data-row-value">{user?.securityLevel || 'Encrypted / Protected'}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Registration Date</span>
              <span className="data-row-value">{memberSince}</span>
            </div>

            <div className="data-row-item">
              <span className="data-row-label">Session Health</span>
              <span className="data-row-value" style={{ color: 'var(--success-color)' }}>
                ● Normal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
