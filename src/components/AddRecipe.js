import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/recipes/';
const AddRecipe = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { name, ingredients, instructions };
        axios.post(BASE_URL, newRecipe)
        .then(response => {
            console.log('Recipe added:', response.data);
            // Clear the form
            setName('');
            setIngredients('');
            setInstructions('');
        })
        .catch(error => console.error('Error adding recipe:', error));
    };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe Name"
          required
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
          required
        />
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddRecipe;