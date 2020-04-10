import React, {useEffect, useState } from 'react';
import Recipes from './Recipes'
import './App.css'


function App() {

  const ID = process.env.REACT_APP_API_ID;
  const appKey = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${appKey}`)
      const data = await response.json()
      console.log(data.hits);
      setRecipes(data.hits)

  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div>
      <form onSubmit={getSearch} className='search-form'>
        <input type='text' className='search-bar' value={search} onChange={updateSearch} />
        <button  type='submit' className='search-button'>
          Search
        </button>
      </form>
      <div className='recipe'>
      {recipes.map(recipes => (
        <Recipes 
           title={recipes.recipe.label}
           calories={recipes.recipe.calories}
           image={recipes.recipe.image}
           ingredients={recipes.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
