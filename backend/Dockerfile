FROM php:8.2-apache

# ============================
# 🚀 Inicio Build Backend
# ============================
RUN echo "" \
    && echo "===== 🚀 Inicio Build Backend =====" \
    && echo ""

# ----------------------------
# 📦 Instalando dependencias PHP
# ----------------------------
RUN echo "" \
    && echo "=> 📦 Instalando dependencias PHP..." \
    && apt-get update && apt-get install -y --no-install-recommends \
        libzip-dev zip unzip git libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/* \
    && echo "" \
    && echo "✔ Dependencias PHP instaladas ✅" \
    && echo ""

# ----------------------------
# 🔧 Configuración Apache
# ----------------------------
RUN echo "" \
    && echo "=> 🔧 Configurando Apache..." \
    && sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && echo "" \
    && echo "✔ Apache configurado ✅" \
    && echo ""

# ----------------------------
# 📄 Copiar configuración y código
# ----------------------------
RUN echo "" \
    && echo "=> 📄 Copiando apache.conf..."
COPY apache.conf /etc/apache2/sites-available/000-default.conf

RUN echo "" \
    && echo "=> 📄 Copiando código fuente..."
WORKDIR /var/www/html
COPY . /var/www/html

# ----------------------------
# 🔑 Configurar permisos
# ----------------------------
RUN echo "" \
    && echo "=> 🔑 Ajustando permisos..." \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && echo "" \
    && echo "✔ Permisos configurados ✅" \
    && echo ""

# ----------------------------
# 🌐 Exponer puerto
# ----------------------------
EXPOSE 80

# ----------------------------
# ✅ Resumen Build Backend
# ----------------------------
RUN echo "" \
    && echo "===== Backend Build Completo! =====" \
    && echo "" \
    && echo "✔ PHP y extensiones instaladas" \
    && echo "✔ Apache configurado" \
    && echo "✔ Código copiado y permisos ajustados" \
    && echo "🌐 URL de acceso: http://localhost:8081 (backend)" \
    && echo ""

CMD ["apache2-foreground"]

