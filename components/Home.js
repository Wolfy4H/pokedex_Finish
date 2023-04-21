import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // import the CSS file

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${(currentPage - 1) * 30}`)
      .then(response => {
        setPokemons(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 30));
      })
      .catch(error => console.log(error));
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleAddFavorite = (pokemon) => {
    if (!favorites.includes(pokemon)) {
      setFavorites([...favorites, pokemon]);
    }
  }

  const handleRemoveFavorite = (pokemon) => {
    const index = favorites.indexOf(pokemon);
    if (index > -1) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFavorites = favorites.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Pokedex</h1>
      
      <a href="/contact">
      <button className='buttonrouting'>Klik hier om te zoeken..</button>
    </a>
   
      <ul>
        {filteredPokemons.map(pokemon => (
          <li key={pokemon.name}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <button onClick={() => handleAddFavorite(pokemon)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
      <h1>Favorites</h1>
      <ul>
        {filteredFavorites.map(pokemon => (
          <li key={pokemon.name}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <button onClick={() => handleRemoveFavorite(pokemon)}>Remove from Favorites</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
// Path: src\components\Home.css
export default Home;