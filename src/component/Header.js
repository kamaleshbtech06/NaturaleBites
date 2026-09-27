import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-text">Naturale<span className="brand-accent">Bites</span></span>
        </NavLink>
        <nav className="navbar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
            Home
          </NavLink>
          <NavLink to="/meals" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Food Categories
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            About Cuisines
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;