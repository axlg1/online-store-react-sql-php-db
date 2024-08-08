import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost/commerce-backend/register.php', {
      email,
      password
    })
    .then(response => {
      if (response.data.success) {
        setSuccess(response.data.success);
        setError(null);
      } else {
        setError(response.data.error);
        setSuccess(null);
      }
    })
    .catch(err => {
      setError("Erreur lors de l'inscription : " + err.message);
      setSuccess(null);
    });
  };

  return (
    <div className="register">
      <h2>Créer un compte</h2>
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
        <button type="submit">S'inscrire</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}

export default Register;
