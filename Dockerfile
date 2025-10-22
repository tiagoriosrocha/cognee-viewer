# Dockerfile para desenvolvimento Vue.js
# Este arquivo cria um container para desenvolvimento da aplicação

# Usar Node.js 18 como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta 8080
EXPOSE 8080

# Comando para executar a aplicação
CMD ["npm", "run", "serve"]
