import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = ({
  products,
  categories,
  handleAddToCart,
  handleRemoveFromCart,
  loading,
  error,
  selectedCategory,
  handleCategoryFilter,
  sortByPrice,
  setSortByPrice,
  cart,
}) => {
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let sorted = [...products];

    if (sortByPrice === "lowToHigh") {
      sorted.sort((a, b) => a.prix - b.prix);
    } else if (sortByPrice === "highToLow") {
      sorted.sort((a, b) => b.prix - a.prix);
    }

    setSortedProducts(sorted);
  }, [sortByPrice, products]);

  const filteredProducts = selectedCategory === "all"
    ? sortedProducts
    : sortedProducts.filter(product => product.categorie === selectedCategory);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="home">
      <nav>
        <div className="nav-left">
          <a href="/search">Recherche</a>
          <a href="/add-product">Ajouter un Produit</a>
        </div>
        <button onClick={handleLogout}>Se Déconnecter</button>
      </nav>

      <h1>TP Final Prog 3</h1>

      <div className="filter-sort-container">
        <div className="filter">
          <label>Filtrer par catégorie :</label>
          <select value={selectedCategory || ""} onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="all">Tout</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="sort">
          <label>Trier par prix :</label>
          <select value={sortByPrice || ""} onChange={(e) => setSortByPrice(e.target.value)}>
            <option value="">Choisir</option>
            <option value="lowToHigh">Du plus bas au plus élevé</option>
            <option value="highToLow">Du plus élevé au plus bas</option>
          </select>
        </div>
      </div>

      <div className="cart">
        <h2>Panier</h2>
        {cart.map((product, index) => (
          <div key={index} className="cart-item">
            <h3>{product.nom}</h3>
            <p>Prix: ${product.prix}</p>
            <button onClick={() => handleRemoveFromCart(product)}>Retirer</button>
          </div>
        ))}
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      {filteredProducts.length === 0 && !loading && !error && <p>Aucun produit trouvé</p>}

      <div className="products">
        {filteredProducts.map((product, index) => (
          <div key={index} className="card product">
            <figure>
              <img src={product.image} alt={product.nom} />
            </figure>
            <section className="details">
              <div className="min-details">
                <h1>{product.nom}<span>{product.categorie}</span></h1>
                <h1 className="price">${product.prix}</h1>
              </div>
              <a href="#" className="btn" onClick={() => handleAddToCart(product)}>add to cart</a>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
