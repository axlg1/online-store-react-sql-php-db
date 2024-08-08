import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost/commerce-backend/login.php', {
      email: email,
      password: password
    })
    .then(response => {
      if (response.data.success) {
        setSuccess(response.data.success);
        setError(null);
        localStorage.setItem('authToken', response.data.token); // Save token to localStorage if returned
        navigate('/'); // Redirect to home page on success
      } else if (response.data.error) {
        setError(response.data.error);
        setSuccess(null);
      }
    })
    .catch(err => {
      setError("Erreur lors de la connexion : " + err.message);
      setSuccess(null);
    });
  };

  return (
    <div className="login">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
      <p><a href="/register">Créer un compte</a></p>
    </div>
  );
};

export default Login;
