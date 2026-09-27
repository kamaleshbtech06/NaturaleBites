import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const featuredCategories = [
    { name: "Vegetarian", icon: "🥗", desc: "Fresh plant-based meals" },
    { name: "Breakfast", icon: "🍳", desc: "Energy for your morning" },
    { name: "Seafood", icon: "🐟", desc: "Ocean fresh delicacies" },
    { name: "Dessert", icon: "🍰", desc: "Naturally sweet treats" },
    { name: "Pasta", icon: "🍝", desc: "Authentic hearty dishes" },
    { name: "Chicken", icon: "🍗", desc: "Protein-rich classics" }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>🌿 100% Authentic Cuisines & Recipes</span>
        </div>
        <h1 className="hero-title">
          Pure, Natural Cuisines <br />
          <span className="title-highlight">From Around The World</span>
        </h1>
        <p className="hero-subtitle">
          Explore thousands of fresh recipes, ingredients, and cooking steps powered by TheMealDB API with a soothing natural experience.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/meals")}>
            Explore Food Categories 🍽️
          </button>
          <button className="btn-secondary" onClick={() => navigate("/about")}>
            Learn About Cuisines
          </button>
        </div>
      </section>

      <section className="categories-preview-section">
        <div className="section-header">
          <h2>Popular Cuisines</h2>
          <p>Browse by dish type and discover your next favorite meal</p>
        </div>
        <div className="categories-grid">
          {featuredCategories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/meals?category=${cat.name}`)}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="feature-item">
          <span className="feature-icon">🌱</span>
          <h3>Fresh Ingredients</h3>
          <p>Detailed ingredient lists with precise measurements for every single dish.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🌍</span>
          <h3>Global Flavors</h3>
          <p>Discover Italian, Indian, Japanese, Mexican, and dozens of regional traditions.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎥</span>
          <h3>Step-by-Step Guides</h3>
          <p>Easy to follow instructions and direct video tutorials for home cooks.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;