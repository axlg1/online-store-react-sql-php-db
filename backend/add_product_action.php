<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nom']) || !isset($data['prix']) || !isset($data['categorie']) || !isset($data['image'])) {
        echo json_encode(['error' => 'Données reçues invalides']);
        exit();
    }

    $nom = $data['nom'];
    $prix = $data['prix'];
    $categorie = $data['categorie'];
    $image = $data['image'];

    $stmt = $conn->prepare("INSERT INTO produits (nom, prix, image, categorie) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdss", $nom, $prix, $image, $categorie);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Produit ajouté avec succès']);
    } else {
        echo json_encode(['error' => 'Erreur lors de l\'ajout du produit']);
    }
}
?>
