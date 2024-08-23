'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


const BASE_URL = 'http://127.0.0.1:8000/api/recipes/';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Recipes</h1>
        <div className="flex justify-end mb-4">
          <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Recipe</Link>
        </div>
        <ul className="space-y-4">
          {recipes.map(recipe => (
            <li key={recipe.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
              <div className="flex items-center space-x-4">
                <img src="https://www.pennmedicine.org/-/media/images/miscellaneous/food%20and%20drink/colorful_plate.ashx?mw=620&mh=408" alt={recipe.name} className="w-16 h-16 object-cover rounded-full" />
                <div>
                  <h2 className="text-xl font-semibold">{recipe.name}</h2>
                  <div className="flex space-x-2 mt-2">
                    <Link to={`/update/${recipe.id}`} className="text-blue-500">Update</Link>
                    <button onClick={(e) => { e.stopPropagation(); deleteRecipe(recipe.id); }} className="text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>
          <p className="mb-2"><strong>Ingredients:</strong></p>
          <ul className="mb-4 list-disc">
            {selectedRecipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index} className="ml-5 mb-1">{ingredient.trim()}</li>
            ))}
          </ul>
          <p className="mb-2"><strong>Instructions:</strong></p>
          <p className="mb-4">{selectedRecipe.instructions}</p>
          <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default RecipeList;