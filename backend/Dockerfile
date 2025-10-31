# Usamos Ubuntu 22.04
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalamos Apache y PHP
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    php-mysql \
    php-cli \
    php-curl \
    php-mbstring \
    php-xml \
    php-bcmath \
    git \
    unzip \
    curl \
    wget \
    lsb-release \
    software-properties-common \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configuración de Apache
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && a2enmod rewrite headers

WORKDIR /var/www/html

# Copiamos archivos
COPY . /var/www/html

# Ajustamos permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
