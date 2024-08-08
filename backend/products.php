<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}
require 'db.php';

$sql = "SELECT * FROM produits ORDER BY nom";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Produits filtrés</title>
</head>
<body>
    <h2>Produits</h2>
    <table border="1">
        <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Catégorie</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row['nom']; ?></td>
            <td><?php echo $row['prix']; ?></td>
            <td><img src="<?php echo $row['image']; ?>" width="100"></td>
            <td><?php echo $row['categorie']; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
    <a href="home.php">Retour à l'accueil</a>
</body>
</html>
