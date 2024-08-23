import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/recipes/${id}/`)
      .then(response => setName(response.data.name))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/recipes/${id}/`, { name })
      .then(() => history.push('/'))
      .catch(error => console.error('Error updating recipe:', error));
  };

  return (
    <div>
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe Name"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;