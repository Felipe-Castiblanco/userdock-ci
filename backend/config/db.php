<?php
// backend/config/db.php
class DB {
    public static function connect() {
        $host = getenv('DB_HOST') ?: 'db';
        $db   = getenv('DB_NAME') ?: 'usercrud';
        $user = getenv('DB_USER') ?: 'appuser';
        $pass = getenv('DB_PASS') ?: 'apppass';

        try {
            $pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8mb4", $user, $pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (Exception $e) {
            error_log('DB connection failed: '.$e->getMessage());
            throw new Exception('Database connection failed');
        }
    }
}

// Crear conexión global
try {
    $pdo = DB::connect();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}