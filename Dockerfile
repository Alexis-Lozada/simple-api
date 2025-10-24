# Imagen base oficial de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install --only=production

COPY . .

# Exponer el puerto que usa Cloud Run
EXPOSE 8080

# Comando para ejecutar la app
CMD ["node", "index.js"]
