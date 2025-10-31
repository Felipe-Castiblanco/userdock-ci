FROM nginx:alpine

# ============================
# 🚀 Inicio Build Frontend
# ============================
RUN echo "" \
    && echo "===== 🚀 Inicio Build Frontend =====" \
    && echo ""

# ----------------------------
# 🧹 Limpiar HTML default
# ----------------------------
RUN echo "" \
    && echo "=> 🧹 Limpiando HTML default..." \
    && rm -rf /usr/share/nginx/html/* \
    && echo "" \
    && echo "✔ HTML default eliminado ✅" \
    && echo ""

# ----------------------------
# 📂 Crear estructura de carpetas
# ----------------------------
RUN echo "" \
    && echo "=> 📂 Creando estructura de directorios..." \
    && mkdir -p /usr/share/nginx/html/assets/css /usr/share/nginx/html/assets/js \
    && echo "" \
    && echo "✔ Estructura creada ✅" \
    && echo ""

# ----------------------------
# 📄 Copiar archivos estáticos
# ----------------------------
RUN echo "" \
    && echo "=> 📄 Copiando archivos estáticos..."
COPY html/ /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ----------------------------
# 🔑 Ajustar permisos
# ----------------------------
RUN echo "" \
    && echo "=> 🔑 Ajustando permisos..." \
    && chmod -R 755 /usr/share/nginx/html/ \
    && echo "" \
    && echo "✔ Permisos ajustados ✅" \
    && echo ""

# ----------------------------
# 🔍 Verificación final
# ----------------------------
RUN echo "" \
    && echo "=> 🔍 Verificando archivos copiados..." \
    && ls -la /usr/share/nginx/html/ \
    && ls -la /usr/share/nginx/html/assets/ \
    && ls -la /usr/share/nginx/html/assets/js/ \
    && ls -la /usr/share/nginx/html/assets/css/ \
    && echo "" \
    && echo "✔ Archivos verificados ✅" \
    && echo ""

# ----------------------------
# 🌐 Exponer puerto
# ----------------------------
EXPOSE 80

# ----------------------------
# ✅ Resumen Build Frontend
# ----------------------------
RUN echo "" \
    && echo "===== Frontend Build Completo! =====" \
    && echo "" \
    && echo "✔ Archivos estáticos copiados" \
    && echo "✔ Estructura de directorios correcta" \
    && echo "🌐 URL de acceso: http://localhost:8080 (frontend)" \
    && echo ""

CMD ["nginx", "-g", "daemon off;"]

