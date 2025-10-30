class UserManager {
    constructor() {
        this.API_URL = 'http://localhost:8080/api';
        this.init();
    }


    /**
     * Realiza una llamada a la API con manejo de errores y logging.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
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

            console.log('Making API call to:', url);

            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API response not OK:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Call failed:', error);
            this.showAlert(`Error de conexión: ${error.message}`, 'danger');
            throw error;
        }
    }

    /**
     * Muestra una alerta en la interfaz de usuario.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
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

    /**
     * Formatea una fecha en formato legible.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Obtiene las iniciales de un nombre.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }

    /**
     * Escapa caracteres HTML para prevenir XSS.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

/**
 * Lista y gestiona usuarios.
 * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
 */
class UserList extends UserManager {
    async init() {
        await this.loadUsers();
        this.setupEventListeners();
    }

    async loadUsers() {
        const tbody = document.getElementById('usersTbody');
        if (!tbody) return;

        try {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center"><div class="spinner-border" role="status"></div><div class="mt-2">Cargando usuarios...</div></td></tr>';

            const users = await this.apiCall('/users');

            if (users.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay usuarios registrados</td></tr>';
                return;
            }

            tbody.innerHTML = users.map(user => `
                <tr>
                    <td><div class="user-avatar">${this.getInitials(user.name)}</div></td>
                    <td>${user.id}</td>
                    <td>${this.escapeHtml(user.name)}</td>
                    <td>${this.escapeHtml(user.email)}</td>
                    <td>${user.phone ? this.escapeHtml(user.phone) : '<span class="text-muted">N/A</span>'}</td>
                    <td>${this.formatDate(user.created_at)}</td>
                    <td class="action-buttons">
                        <a href="view.html?id=${user.id}" class="btn btn-info btn-sm" title="Ver"><i class="bi bi-eye"></i></a>
                        <a href="create.html?id=${user.id}" class="btn btn-warning btn-sm" title="Editar"><i class="bi bi-pencil"></i></a>
                        <button class="btn btn-danger btn-sm" onclick="userList.deleteUser(${user.id})" title="Eliminar"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error cargando usuarios. Verifica que el backend esté funcionando.</td></tr>';
        }
    }

    /**
     * Elimina un usuario por ID.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    async deleteUser(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

        try {
            await this.apiCall(`/users/${id}`, { method: 'DELETE' });
            this.showAlert('Usuario eliminado correctamente', 'success');
            await this.loadUsers();
        } catch (error) { }
    }

    /**
     * Configura los listeners de eventos.
     * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
     */
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('#usersTbody tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }
    }
}

/**
 * Formulario para crear o editar usuarios.
 * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
 */
class UserForm extends UserManager {
    async init() {
        this.userId = new URLSearchParams(location.search).get('id');
        await this.loadUserData();
        this.setupForm();
    }

    async loadUserData() {
        if (!this.userId) return;
        try {
            const user = await this.apiCall(`/users/${this.userId}`);
            document.getElementById('name').value = user.name || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('formTitle').textContent = 'Editar Usuario';
            document.getElementById('submitBtn').innerHTML = '<i class="bi bi-check-circle"></i> Actualizar Usuario';
        } catch (error) {
            this.showAlert('Error cargando datos del usuario', 'danger');
        }
    }

    setupForm() {
        const form = document.getElementById('userForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async handleSubmit() {
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Procesando...';

            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim()
            };

            if (!formData.name || !formData.email) throw new Error('Nombre y email son requeridos');

            if (this.userId) {
                await this.apiCall(`/users/${this.userId}`, { method: 'PUT', body: formData });
                this.showAlert('Usuario actualizado correctamente', 'success');
            } else {
                await this.apiCall('/users', { method: 'POST', body: formData });
                this.showAlert('Usuario creado correctamente', 'success');
            }

            setTimeout(() => { location.href = 'index.html'; }, 1500);

        } catch (error) { }
        finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
}

/**
 * Vista detallada de un usuario.
 * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
 */
class UserView extends UserManager {
    async init() {
        await this.loadUser();
    }

    async loadUser() {
        const container = document.getElementById('userView');
        if (!container) return;

        const userId = new URLSearchParams(location.search).get('id');
        if (!userId) {
            container.innerHTML = '<div class="alert alert-warning">ID de usuario no especificado</div>';
            return;
        }

        try {
            const user = await this.apiCall(`/users/${userId}`);

            container.innerHTML = `
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="bi bi-person-circle"></i> Información del Usuario</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2 text-center mb-3">
                                <div class="user-avatar mx-auto" style="width: 80px; height: 80px; font-size: 24px;">
                                    ${this.getInitials(user.name)}
                                </div>
                            </div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><strong>ID:</strong> ${user.id}</p>
                                        <p><strong>Nombre:</strong> ${this.escapeHtml(user.name)}</p>
                                        <p><strong>Email:</strong> ${this.escapeHtml(user.email)}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Teléfono:</strong> ${user.phone ? this.escapeHtml(user.phone) : 'N/A'}</p>
                                        <p><strong>Creado:</strong> ${this.formatDate(user.created_at)}</p>
                                        <p><strong>Actualizado:</strong> ${user.updated_at ? this.formatDate(user.updated_at) : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = '<div class="alert alert-danger">Error cargando información del usuario</div>';
        }
    }
}

/**
 * Inicializa la aplicación según la página actual.
 * @author Johan Alexander Farfan Sierra <johanfarfan25@gmail.com>
 */
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    if (path.endsWith('index.html') || path.endsWith('/')) {
        window.userList = new UserList();
        userList.init();
    } else if (path.endsWith('create.html')) {
        window.userForm = new UserForm();
        userForm.init();
    } else if (path.endsWith('view.html')) {
        window.userView = new UserView();
        userView.init();
    }
});
