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
    <title>Changer le mot de passe</title>
</head>
<body>
    <h2>Changer le mot de passe</h2>
    <form action="change_password_action.php" method="post">
        <label for="old_password">Ancien mot de passe:</label><br>
        <input type="password" id="old_password" name="old_password"><br>
        <label for="new_password">Nouveau mot de passe:</label><br>
        <input type="password" id="new_password" name="new_password"><br><br>
        <input type="submit" value="Changer">
    </form>
    <a href="home.php">Retour à l'accueil</a>
</body>
</html>
