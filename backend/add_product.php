<?php
session_start();
require 'db.php';

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $image = $_POST['image'];
    $category = $_POST['category'];

    // Préparer la requête pour ajouter un produit
    $stmt = $conn->prepare("INSERT INTO produits (nom, prix, image, categorie) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdss", $name, $price, $image, $category);
    
    if ($stmt->execute()) {
        header("Location: accueil.php");
    } else {
        $error = "Erreur lors de l'ajout du produit. Veuillez réessayer.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Ajouter un produit</title>
</head>
<body>
    <h1>Ajouter un produit</h1>
    <?php if (!empty($error)) echo "<p>$error</p>"; ?>
    <form method="post" action="">
        <label for="name">Nom du produit:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="price">Prix:</label>
        <input type="number" id="price" name="price" step="0.01" required>
        <br>
        <label for="image">URL de l'image:</label>
        <input type="text" id="image" name="image" required>
        <br>
        <label for="category">Catégorie:</label>
        <select id="category" name="category" required>
            <option value="Mode">Mode</option>
            <option value="Bijoux">Bijoux</option>
            <option value="Électronique">Électronique</option>
        </select>
        <br>
        <button type="submit">Ajouter</button>
    </form>
</body>
</html>
