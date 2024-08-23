import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/update/:id" element={<UpdateRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
