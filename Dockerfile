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

# Adicionando o wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copie os arquivos e diretórios da sua aplicação para o container
COPY . .

# Informe a porta que a aplicação utiliza ...: não consegui ainda pegar a porta do .env
EXPOSE 3000
# porta do debugger
EXPOSE 9229

#Modifiquei para dentro do docker-compose COMMAND
# O comando padrão está comentado, pois você está definindo o comando no docker-compose.yml
# CMD ["node", "src/app.js"]
