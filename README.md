# 🧭 Proyecto USER DOCK CI Dockerizado

**Despliegue automático de un CRUD de usuarios con frontend en HTML, CSS, JavaScript + Nginx y backend en PHP + MySQL**

---

## 🧑‍💻 Desarrollado por

**Johan Alexander Farfán Sierra**
📧 [johanfarfan25@gmail.com](mailto:johanfarfan25@gmail.com)
🐙 [GitHub: JohanFarfan25](https://github.com/JohanFarfan25)

---

## 📘 Descripción del Proyecto

Este proyecto permite **dockerizar un CRUD completo de usuarios**, con:

* Sistema base **Ubuntu 22.04**.
* Backend **PHP 8.2 + Apache**.
* Frontend **HTML, CSS, JavaScript + Nginx**.
* Base de datos **MySQL 8.0**.
* Orquestación **Docker y Docker Compose**.
* Volúmenes persistentes para datos y código (`./backend`, `./frontend`, `db_data`).

La estructura permite **entornos totalmente reproducibles**, donde los contenedores se comunican mediante una red Docker interna.

---

## 🚀 Tecnologías utilizadas

* Sistema operativo base: Ubuntu 22.04
* MySQL 8.0
* PHP 8.2 + Apache
* Nginx: Alpine
* Docker: 24.0+
* Docker Compose: 2.20+

---

## ⚙️ Requisitos previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

| Herramienta    | Versión mínima | Comando de verificación    |
| -------------- | -------------- | -------------------------- |
| Docker         | 24.x           | `docker --version`         |
| Docker Compose | 2.x            | `docker-compose --version` |
| Git            | 2.x            | `git --version`            |
| Bash           | 5.x            | `bash --version`           |

---

## 📦 Instalación paso a paso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/JohanFarfan25/userdock-ci
cd usercrud-docker
```

### 2️⃣ Configurar variables de entorno

Crea un archivo `.env`:

```env
# Ports
BACKEND_PORT=8080
FRONTEND_PORT=8000

# MySQL
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=usercrud
MYSQL_USER=appuser
MYSQL_PASSWORD=apppass

# frontend Dockerfile
API_URL=http://backend:80/api
```

---

## 🏗️ Estructura del Proyecto

```bash
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── apache.conf
│   ├── config
│   │   ├── db.php
│   │   └── init.sql
│   ├── controllers
│   │   └── UserController.php
│   ├── index.php
│   └── services
│       └── Users.php
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── js
│   │       └── users.js
│   ├── html
│   │   ├── create.html
│   │   ├── index.html
│   │   └── view.html
│   ├── index.html
│   └── nginx.conf
└── show_summary.sh

```

---

## ⚙️ Componentes Principales

### `docker-compose.yml`

Orquesta tres servicios:

* **db** → Contenedor MySQL con credenciales definidas en `.env`.
* **backend** → Contenedor PHP + Apache, con código fuente y dependencias.
* **frontend** → Contenedor HTML, CSS, JavaScript + Nginx, conectado al backend.

---

## 🚀 Cómo Desplegar el Proyecto

1. **Construir e iniciar contenedores:**

```bash
docker-compose build --no-cache
docker-compose up -d
```

2. **Verificar contenedores activos:**

```bash
docker ps
```

3. **Acceder a la aplicación:**

* Frontend: `http://localhost:8000`
* Backend: `http://localhost:8080`

> Nota: Los puertos se pueden cambiar en el `.env`.

---

## 💾 Respaldo de la Base de Datos

* El volumen `db_data` mantiene los datos de MySQL persistentes.
* Para respaldos manuales:

```bash
docker exec -it mysql_usercrud mysqldump -u appuser -p usercrud > backup.sql
```

* Para restaurar:

```bash
docker exec -i mysql_usercrud mysql -u appuser -p usercrud < backup.sql
```

---

## 🔒 Seguridad Recomendada

* Cambiar todas las contraseñas definidas por defecto en `.env`.
* Limitar el acceso externo a MySQL si no es necesario.
* Configurar HTTPS si se expone el frontend públicamente.

---

## 📦 Apagar / Reiniciar Servicios

```bash
docker-compose down          # Detener todos los contenedores
docker-compose up -d         # Iniciar en segundo plano
docker-compose down -v       # Borrar contenedores y volúmenes
docker system prune -a --volumes # Limpiar contenedores y volúmenes no usados
docker exec -it php_backend bash # Acceder al contenedor backend
```

---

## 🧠 Ventajas de esta arquitectura

✅ Aislamiento completo entre servicios
✅ Volúmenes persistentes para datos y código
✅ Despliegue reproducible en cualquier máquina
✅ Compatible con redes locales y remotas

---

## 🏆 Créditos

Proyecto desarrollado por **Johan Alexander Farfán Sierra**
Arquitectura Dockerizada y documentación técnica completa 2025.
