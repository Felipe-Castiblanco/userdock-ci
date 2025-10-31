<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/controllers/UserController.php';

$request_uri = $_SERVER['REQUEST_URI'];
$path = trim(parse_url($request_uri, PHP_URL_PATH), '/');
$parts = array_values(array_filter(explode('/', $path)));

if ($path === '' || $path === '/') {
    echo json_encode(['status' => 'OK', 'service' => 'User CRUD API']);
    exit;
}

if (count($parts) >= 2 && $parts[0] === 'api' && $parts[1] === 'users') {
    $ctrl = new UserController();
    $id = $parts[2] ?? null;
    $method = $_SERVER['REQUEST_METHOD'];

    $input = [];
    if (in_array($method, ['POST', 'PUT'])) {
        $raw = file_get_contents('php://input');
        $input = json_decode($raw, true) ?? $_POST;
    }

    try {
        switch ($method) {
            case 'GET':
                echo json_encode($id ? $ctrl->view((int)$id) : $ctrl->list());
                break;
            case 'POST':
                echo json_encode($ctrl->store($input));
                break;
            case 'PUT':
                echo json_encode($ctrl->update((int)$id, $input));
                break;
            case 'DELETE':
                echo json_encode($ctrl->delete((int)$id));
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'path' => $path]);
