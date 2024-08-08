import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleAddProduct = () => {
    if (!nom || !prix || !categorie || !image) {
      setMessage('Veuillez remplir tous les champs');
      return;
    }
    if (isNaN(prix) || prix <= 0) {
      setMessage('Le prix doit être un nombre positif');
      return;
    }

    axios.post('http://localhost/commerce-backend/add_product_action.php', {
      nom,
      prix,
      categorie,
      image
    })
    .then(response => {
      if (response.data.success) {
        setMessage('Produit ajouté avec succès');
        setNom('');
        setPrix('');
        setCategorie('');
        setImage('');
      } else {
        setMessage('Erreur lors de l\'ajout du produit');
      }
    })
    .catch(err => {
      console.log(err);
      setMessage('Erreur lors de l\'ajout du produit');
    });
  };

  return (
    <div className="add-product">
      <h1>Ajouter un produit</h1>
      <form>
        <label>Nom du produit</label>
        <input
          type="text"
          placeholder="Nom du produit"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label>Prix</label>
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
        <label>Catégorie</label>
        <input
          type="text"
          placeholder="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />
        <label>URL de l'image</label>
        <input
          type="text"
          placeholder="URL de l'image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="button" onClick={handleAddProduct}>Ajouter</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AddProduct;
