FROM nginx:alpine

# Clean default
RUN rm -rf /usr/share/nginx/html/*

# Crear estructura de directorios
RUN mkdir -p /usr/share/nginx/html/assets/css /usr/share/nginx/html/assets/js

# Copiar archivos estáticos
COPY html/ /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Asegurar permisos
RUN chmod -R 755 /usr/share/nginx/html/

# Verificar que los archivos se copiaron correctamente
RUN ls -la /usr/share/nginx/html/ && \
    ls -la /usr/share/nginx/html/assets/ && \
    ls -la /usr/share/nginx/html/assets/js/ && \
    ls -la /usr/share/nginx/html/assets/css/

EXPOSE 80