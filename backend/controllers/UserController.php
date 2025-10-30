<?php
require_once __DIR__ . '/../services/Users.php';

class UserController
{
    private $service;
    public function __construct()
    {
        $this->service = new UsersService();
    }

    /**
     * Listar todos los usuarios
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function list()
    {
        return $this->service->all();
    }

    /**
     * Obtener un usuario por su ID
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function view($id)
    {
        return $this->service->find($id);
    }

    /**
     * Crear un nuevo usuario
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function store($data)
    {
        if (empty($data['name']) || empty($data['email'])) {
            http_response_code(400);
            return ['error' => 'name and email required'];
        }
        try {
            $newId = $this->service->create($data);
            return $this->service->find($newId);
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
    /**
     * Actualizar un usuario existente
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function update($id, $data)
    {
        try {
            $this->service->update($id, $data);
            return $this->service->find($id);
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Eliminar un usuario
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    public function delete($id)
    {
        try {
            $ok = $this->service->delete($id);
            return ['deleted' => (bool)$ok];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}
