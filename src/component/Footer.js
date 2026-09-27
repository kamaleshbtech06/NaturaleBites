import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>🌿 NaturaleBites</h3>
          <p>Fresh, organic recipes & culinary discovery powered by TheMealDB.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/meals">Food Categories</Link>
          <Link to="/about">About Cuisines</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 NaturaleBites Food App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;