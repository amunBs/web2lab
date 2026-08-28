export default function Navbar({
  currentUser,
  isLoggedIn,
  onLogout,
  theme,
  onToggleTheme,
}) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <span className="nav-brand">Web 2</span>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'White'} Theme`}
          >
            {theme === 'light' ? 'Dark Theme' : 'White Theme'}
          </button>

          {isLoggedIn && currentUser && (
            <>
              <span className="nav-user-badge">
                👤 {currentUser.fullName || currentUser.username}
              </span>
              <button
                type="button"
                className="btn-nav-logout"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
