<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db = 'commerce';
$user = 'root';
$pass = '';

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des données envoyées
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        // Vérifier si l'utilisateur existe déjà
        $stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(['error' => 'L\'email est déjà utilisé']);
            exit();
        }

        // Inscription sans hachage de mot de passe
        $stmt = $pdo->prepare("INSERT INTO utilisateurs (email, motDePasse) VALUES (?, ?)");
        $stmt->execute([$email, $password]);

        echo json_encode(['success' => 'Inscription réussie !']);
    } else {
        echo json_encode(['error' => 'Données reçues invalides']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur de connexion : ' . $e->getMessage()]);
}
?>
