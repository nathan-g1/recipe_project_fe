import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000/api/recipes/';
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const deleteRecipe = (id) => {
    axios.delete(`${BASE_URL}${id}/delete/`)
      .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
      .catch(error => console.error('Error deleting recipe:', error));
  };

  return (
    <div>
      <h1>Recipes</h1>
      <Link to="/add">Add Recipe</Link>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.name}
            <Link to={`/update/${recipe.id}`}>Update</Link>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;