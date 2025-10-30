#!/bin/sh

# Cargar variables del .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Colores ANSI
CYAN="\033[36m"
BLUE="\033[34m"
GREEN="\033[32m"
DARKBLUE="\033[34m"
RESET="\033[0m"

echo ""
echo -e "${CYAN}==============================================="
echo -e "         🚀 RESUMEN FINAL DEL BUILD 🚀"
echo -e "===============================================${RESET}"
echo ""

# Backend
echo -e "${CYAN}===== Backend Build Completo! =====${RESET}"
echo ""
echo -e "${DARKBLUE}✔${GREEN} PHP y extensiones instaladas${RESET}"
echo -e "${DARKBLUE}✔${GREEN} Apache configurado${RESET}"
echo -e "${DARKBLUE}✔${GREEN} Código copiado y permisos ajustados${RESET}"
echo -e "${GREEN}🌐 URL de acceso: http://localhost:${BACKEND_PORT} (backend)${RESET}"
echo ""

# Frontend
echo -e "${CYAN}===== Frontend Build Completo! =====${RESET}"
echo ""
echo -e "${DARKBLUE}✔${GREEN} Archivos estáticos copiados${RESET}"
echo -e "${DARKBLUE}✔${GREEN} Estructura de directorios correcta${RESET}"
echo -e "${GREEN}🌐 URL de acceso: http://localhost:${FRONTEND_PORT} (frontend)${RESET}"
echo ""

echo -e "${CYAN}==============================================="
echo -e "          🎉 TODO LISTO PARA USAR 🎉"
echo -e "===============================================${RESET}"
echo ""
