<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Accueil</title>
</head>
<body>
    <h2>Bienvenue, <?php echo $_SESSION['username']; ?></h2>
    <a href="products.php">Afficher les produits filtrés</a><br>
    <a href="search.php">Rechercher un produit</a><br>
    <a href="add_product.php">Ajouter un produit</a><br>
    <a href="change_password.php">Changer le mot de passe</a><br>
    <a href="logout.php">Se déconnecter</a>
</body>
</html>
