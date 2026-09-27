import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-hero">
        <span className="about-badge">🌿 About NaturaleBites</span>
        <h1>Authentic Cuisines & Healthy Culinary Inspiration</h1>
        <p>
          NaturaleBites is dedicated to bringing pure, fresh, and diverse culinary choices right to your kitchen using open recipe data from TheMealDB.
        </p>
      </div>

      <div className="about-cards-grid">
        <div className="info-card">
          <div className="info-icon">🍲</div>
          <h3>Global Recipe Index</h3>
          <p>
            Browse hundreds of authentic dishes across 15+ food categories including Vegetarian, Seafood, Pasta, Desserts, and Breakfast.
          </p>
        </div>

        <div className="info-card">
          <div className="info-icon">🌿</div>
          <h3>Fresh Ingredient Breakdown</h3>
          <p>
            View precise quantities and visual ingredient thumbnails for seamless meal planning and healthy cooking.
          </p>
        </div>

        <div className="info-card">
          <div className="info-icon">🎯</div>
          <h3>Smart Cuisine Search</h3>
          <p>
            Filter by regional origin like Italian, Indian, Mexican, or Japanese cuisines, or try a random surprise recipe.
          </p>
        </div>
      </div>

      <div className="about-cta-card">
        <h2>Ready to Explore Delicious Dishes?</h2>
        <p>Dive into our natural food categories and master new recipes today.</p>
        <button className="cta-btn" onClick={() => navigate("/meals")}>
          Browse All Food Categories 🥗
        </button>
      </div>
    </div>
  );
}

export default About;