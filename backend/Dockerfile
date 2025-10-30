FROM php:8.2-apache

# Instalar dependencias
RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev zip unzip git libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/*

# Permitir .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Configurar Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copiar archivo de configuración de Apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copiar código fuente
WORKDIR /var/www/html
COPY . /var/www/html

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
