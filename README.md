# user-crud-subgroup-nine

Proyecto CRUD de usuarios (DEV) - Backend PHP 8.2 + Apache, Frontend HTML+Bootstrap5+JS, MySQL 8.0.
Contenedores: backend, frontend, db. Comunicación por docker-compose.

## Requisitos
- Ubuntu 22.04 (o cualquier sistema con Docker & Docker Compose)
- Docker
- docker-compose (integrado en Docker CLI)

## Instalar Docker (Ubuntu 22.04) - resumen
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl enable --now docker
