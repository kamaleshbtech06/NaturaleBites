import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Meals.css";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const CATEGORIES = [
  "All",
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian"
];

const AREAS = [
  "All Areas",
  "American",
  "British",
  "Canadian",
  "Chinese",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Spanish",
  "Thai"
];

function Meals() {
  const location = useLocation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [detailMeal, setDetailMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category");
    if (catParam && CATEGORIES.includes(catParam)) {
      setSelectedCategory(catParam);
    }
  }, [location.search]);

  const fetchMeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/search.php?s=${searchTerm}`;
      if (selectedCategory !== "All" && searchTerm === "") {
        url = `${BASE_URL}/filter.php?c=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setMeals(response.data.meals || []);
    } catch (err) {
      setError("Failed to fetch food categories and meals. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMeals();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchMeals]);

  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/random.php`);
      if (response.data.meals && response.data.meals.length > 0) {
        setDetailMeal(response.data.meals[0]);
      }
    } catch (err) {
      setError("Failed to fetch random meal.");
    } finally {
      setLoading(false);
    }
  };

  const openMealDetail = async (mealId) => {
    setDetailLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${mealId}`);
      if (response.data.meals && response.data.meals.length > 0) {
        setDetailMeal(response.data.meals[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          name: ingredient,
          measure: measure || ""
        });
      }
    }
    return ingredients;
  };

  const filteredMeals = meals.filter((meal) => {
    const matchesArea =
      selectedArea === "All Areas" ||
      !meal.strArea ||
      meal.strArea.toLowerCase() === selectedArea.toLowerCase();
    return matchesArea;
  });

  return (
    <div className="meals-page-container">
      <div className="meals-header">
        <span className="meals-badge">🥗 Organic Food Database</span>
        <h1>Explore Natural Food Categories</h1>
        <p>Discover healthy, delicious recipes from across the globe</p>
      </div>

      <div className="filter-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="select-box">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <button className="random-btn" onClick={fetchRandomMeal}>
          🎲 Surprise Recipe
        </button>
      </div>

      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(cat);
              setSearchTerm("");
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Harvesting fresh recipes...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && filteredMeals.length === 0 && (
        <div className="empty-state">
          <span>🌿</span>
          <h3>No recipes found</h3>
          <p>Try searching for a different dish name or select another category.</p>
        </div>
      )}

      {!loading && !error && filteredMeals.length > 0 && (
        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => openMealDetail(meal.idMeal)}
            >
              <div className="card-image-wrapper">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  loading="lazy"
                />
                <span className="card-overlay">View Full Recipe 📖</span>
              </div>
              <div className="card-content">
                <div className="card-tags">
                  {meal.strCategory && (
                    <span className="tag-category">{meal.strCategory}</span>
                  )}
                  {meal.strArea && (
                    <span className="tag-area">{meal.strArea}</span>
                  )}
                </div>
                <h3 className="card-title">{meal.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {(detailMeal || detailLoading) && (
        <div className="modal-backdrop" onClick={() => setDetailMeal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetailMeal(null)}>
              ✕
            </button>

            {detailLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
              </div>
            ) : (
              detailMeal && (
                <div className="recipe-detail-body">
                  <div className="recipe-header">
                    <img
                      src={detailMeal.strMealThumb}
                      alt={detailMeal.strMeal}
                      className="recipe-image"
                    />
                    <div className="recipe-info">
                      <h2>{detailMeal.strMeal}</h2>
                      <div className="modal-badges">
                        {detailMeal.strCategory && (
                          <span className="modal-badge-category">
                            🏷️ {detailMeal.strCategory}
                          </span>
                        )}
                        {detailMeal.strArea && (
                          <span className="modal-badge-area">
                            🌍 {detailMeal.strArea} Cuisine
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="recipe-section">
                    <h3>🌱 Fresh Ingredients</h3>
                    <div className="ingredients-grid">
                      {getIngredients(detailMeal).map((ing, idx) => (
                        <div key={idx} className="ingredient-item">
                          <img
                            src={`https://www.themealdb.com/images/ingredients/${ing.name}-Small.png`}
                            alt={ing.name}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div>
                            <span className="ing-title">{ing.name}</span>
                            <span className="ing-measure">{ing.measure}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="recipe-section">
                    <h3>👩‍🍳 Cooking Instructions</h3>
                    <p className="recipe-instructions">
                      {detailMeal.strInstructions}
                    </p>
                  </div>

                  {detailMeal.strYoutube && (
                    <div className="recipe-footer">
                      <a
                        href={detailMeal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-btn"
                      >
                        ▶️ Watch Recipe Video Tutorial
                      </a>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Meals;