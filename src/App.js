import JokeButton from "./components/JokeButton";
import React, { useState, useEffect } from 'react';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const categories = await response.json();

      const categoriesWithJokes = await Promise.all(
        categories.map(async (category) => {
          const jokeResponse = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
          const jokeData = await jokeResponse.json();
          return { category, joke: jokeData.value };
        })
      );

      setCategories(categoriesWithJokes);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleClick = async (category) => {
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  console.log(categories);
  return (
    <div className="buttoncat">
      <div className="buttoncat">
      <h1 className="title">Chuck Norris Jokes</h1>
        {categories.map((categoryData) => (
          <JokeButton 
            key={categoryData.category}
            category={categoryData.category}
            handleClick={() => handleClick(categoryData.category)}
            
          />
          
        ))}
      </div>
    </div>
  );
};

export default App;
