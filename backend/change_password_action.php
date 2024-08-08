<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}
require 'db.php';

$username = $_SESSION['username'];
$old_password = $_POST['old_password'];
$new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($old_password, $row['password'])) {
        $sql = "UPDATE users SET password='$new_password' WHERE username='$username'";
        if ($conn->query($sql) === TRUE) {
            echo "Mot de passe changé avec succès.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Ancien mot de passe incorrect.";
    }
} else {
    echo "Utilisateur non trouvé.";
}
?>
