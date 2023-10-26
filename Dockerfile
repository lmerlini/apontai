# Use uma imagem base oficial do Node.js
FROM node:18

ENV NODE_ENV development

# Defina a pasta de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Instale o sequelize-cli globalmente
RUN npm install -g sequelize-cli

# Copie os arquivos e diretórios da sua aplicação para o container
COPY . .

# Informe a porta que a aplicação utiliza, não consegui ainda pegar a porta do .env
EXPOSE 3000

# Defina o comando para executar sua aplicação
CMD ["node", "src/app.js"]
