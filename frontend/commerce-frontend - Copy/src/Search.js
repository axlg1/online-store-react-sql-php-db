import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length > 2) {
      axios.get(`http://localhost/commerce-backend/search.php?query=${query}`)
        .then(response => {
          setResults(response.data);
          setError(null);
        })
        .catch(err => {
          setError("Erreur lors de la recherche : " + err.message);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Rechercher des produits</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Tapez votre recherche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      {results.length > 0 ? (
        <div className="search-results">
          {results.map((item) => (
            <div className="search-item" key={item.id}>
              <img src={item.image} alt={item.nom} />
              <div className="search-item-details">
                <h3>{item.nom}</h3>
                <p>{item.description}</p>
                <p className="price">${item.prix}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Aucun résultat trouvé pour "{query}"</p>
      )}
    </div>
  );
}

export default Search;
