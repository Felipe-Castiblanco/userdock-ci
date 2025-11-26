// assets/userManager.js

class UserManager {
    constructor() {
        // Usamos un placeholder que se reemplaza en el build
        this.API_URL = "__API_URL__";
        this.init();
    }

    async apiCall(endpoint, options = {}) {
        try {
            const url = `${this.API_URL}${endpoint}`;
            const config = {
                method: options.method || 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                ...options
            };

            if (config.body && typeof config.body === 'object') {
                config.body = JSON.stringify(config.body);
            }

            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            this.showAlert(`Error de conexión: ${error.message}`, 'danger');
            throw error;
        }
    }

    showAlert(message, type = 'info') {
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
        }

        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Ejemplo: listado de usuarios
class UserList extends UserManager {
    async init() {
        await this.loadUsers();
    }

    async loadUsers() {
        const tbody = document.getElementById('usersTbody');
        if (!tbody) return;

        try {
            const users = await this.apiCall('/users');
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone || ''}</td>
                    <td>
                        <a href="view.html?id=${user.id}" class="btn btn-info btn-sm">Ver</a>
                        <a href="create.html?id=${user.id}" class="btn btn-warning btn-sm">Editar</a>
                        <button onclick="userList.deleteUser(${user.id})" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error cargando usuarios. Verifica que el backend esté funcionando.</td></tr>';
        }
    }

    async deleteUser(id) {
        if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
        await this.apiCall(`/users/${id}`, { method: 'DELETE' });
        await this.loadUsers();
    }
}

// Inicialización según la página
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;
    if (path.endsWith('index.html')) {
        window.userList = new UserList();
        userList.init();
    }
});
