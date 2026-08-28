export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <span className="footer-text">
          &copy; {year} Web 2. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
