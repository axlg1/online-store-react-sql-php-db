import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AddProduct from './AddProduct';
import Search from './Search';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    axios.get("http://localhost/commerce-backend/api.php")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des produits:", err);
        setError("Erreur lors de la récupération des produits.");
        setLoading(false);
      });

    setCategories(['Mode', 'Bijoux', 'Électronique']);
  }, []);

  useEffect(() => {
    if (!loading) {
      const sortedProducts = handleSortByPrice(sortByPrice, filteredProducts);
      setFilteredProducts(sortedProducts);
    }
  }, [sortByPrice, filteredProducts, loading]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categorie === category);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    window.alert("Article ajouté au panier !");
  };

  const handleRemoveFromCart = (product) => {
    setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    window.alert("Article supprimé de votre panier !");
  };

  const handleSortByPrice = (sortType, filteredProducts) => {
    let sortedProducts = [...filteredProducts];

    if (sortType === "lowToHigh") {
      sortedProducts.sort((a, b) => a.prix - b.prix);
    } else if (sortType === "highToLow") {
      sortedProducts.sort((a, b) => b.prix - a.prix);
    }

    return sortedProducts;
  };

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    navigate('/'); // Redirige vers la page d'accueil après connexion
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login'); // Redirige vers la page de connexion après déconnexion
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route 
              path="/" 
              element={
                <Home 
                  products={filteredProducts}
                  categories={categories}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  loading={loading}
                  error={error}
                  selectedCategory={selectedCategory}
                  handleCategoryFilter={handleCategoryFilter}
                  setSortByPrice={setSortByPrice}
                  cart={cart}
                  handleLogout={handleLogout} // Pass handleLogout to Home component
                />
              } 
            />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
