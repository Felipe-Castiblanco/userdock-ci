<?php
// backend/services/Users.php
require_once __DIR__ . '/../config/db.php';

class UsersService
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = DB::connect();
    }

    /**
     * Obtener todos los usuarios
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function all()
    {
        $stmt = $this->pdo->query("SELECT id, name, email, phone, created_at, updated_at FROM users ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Obtener un usuario por su ID
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT id, name, email, phone, created_at, updated_at FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$user) {
            throw new Exception('User not found');
        }
        return $user;
    }

    /**
     * Crear un nuevo usuario
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function create($data)
    {
        // Validar email único
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            throw new Exception('Email already exists');
        }

        $stmt = $this->pdo->prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['email'], $data['phone'] ?? null]);
        return $this->pdo->lastInsertId();
    }

    /**
     * Actualizar un usuario existente
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function update($id, $data)
    {
        // Validar que el usuario existe
        $this->find($id);

        // Validar email único (excluyendo el usuario actual)
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
        $stmt->execute([$data['email'], $id]);
        if ($stmt->fetch()) {
            throw new Exception('Email already exists');
        }

        $stmt = $this->pdo->prepare("UPDATE users SET name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        return $stmt->execute([$data['name'], $data['email'], $data['phone'] ?? null, $id]);
    }

    /**
     * Eliminar un usuario
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function delete($id)
    {
        // Validar que el usuario existe
        $this->find($id);

        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
