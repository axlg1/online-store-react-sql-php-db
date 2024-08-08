<?php
session_start();
require 'db.php';

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Récupérer tous les produits
$result = $conn->query("SELECT * FROM produits");
$products = $result->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Accueil</title>
</head>
<body>
    <h1>Accueil</h1>
    <p>Bonjour, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
    <p><a href="logout.php">Se déconnecter</a></p>
    <h2>Produits</h2>
    <ul>
        <?php foreach ($products as $product): ?>
            <li>
                <h3><?php echo htmlspecialchars($product['nom']); ?></h3>
                <img src="<?php echo htmlspecialchars($product['image']); ?>" alt="<?php echo htmlspecialchars($product['nom']); ?>" width="100">
                <p>Prix: $<?php echo number_format($product['prix'], 2); ?></p>
                <p>Catégorie: <?php echo htmlspecialchars($product['categorie']); ?></p>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
