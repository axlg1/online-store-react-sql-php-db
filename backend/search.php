<?php
// Ajouter les en-têtes CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permet toutes les origines
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Méthodes autorisées
header('Access-Control-Allow-Headers: Content-Type'); // En-têtes autorisés

// Gérer les requêtes OPTIONS pour les préflights
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Terminer la requête préflight
}

// Connexion à la base de données
$servername = "localhost";
$username = "root"; // Modifiez selon votre configuration
$password = ""; // Modifiez selon votre configuration
$dbname = "commerce";

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Lire les données POST
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['query'])) {
    $query = $data['query'];

    // Préparer la requête SQL pour éviter les injections SQL
    $stmt = $conn->prepare("SELECT * FROM produits WHERE nom LIKE ?");
    $searchTerm = "%$query%";
    $stmt->bind_param("s", $searchTerm);

    // Exécuter la requête
    $stmt->execute();
    $result = $stmt->get_result();

    // Collecter les résultats
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Envoyer les résultats en JSON
    echo json_encode($products);

    // Fermer la requête
    $stmt->close();
} else {
    echo json_encode(["error" => "No query parameter provided"]);
}

// Fermer la connexion
$conn->close();
?>
