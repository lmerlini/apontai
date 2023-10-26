# Apontai
###### Apontai é um projeto para apontamento de horas. Ele serve como uma ferramenta particular para monitorar e gerenciar horas de trabalho.

# Descrição
Projeto para apontamento de horas, particular.

# Início Rápido
Pré-requisitos
Node.js instalado.
Docker e Docker Compose instalados.
Configuração e Instalação
Clone o repositório:
```

git clone [https://github.com/lmerlini/apontai]
cd apontai
Instale as dependências:
npm install
Inicie o ambiente Docker:
docker-compose up -d
```
Isto irá iniciar os serviços do MySQL, Redis e a aplicação.

# Scripts Disponíveis
```start: Inicia o servidor e o Redis simultaneamente.
db:refresh: Reseta o banco de dados, executa todas as migrações e semeia o banco de dados novamente.
db:migrate: Executa migrações e semeia o banco de dados.
generate-docs: Gera documentação do projeto usando JSDoc.
test: Executa testes usando Jest, IMPORTANTE ESSA FUNCIONALIDADE NÃO ESTÁ TOTALMENTE IMPLEMENTADA
```
# Execute qualquer script com:
``` npm run [NOME_DO_SCRIPT] ```

# Dependências
##### O projeto utiliza diversas bibliotecas e dependências, incluindo:
#
#
_____________
_____________
| Lib | README |
| ------ | ------ |
| bcryptjs: Para criptografia de senhas. | [https://www.npmjs.com/package/bcrypt] |
| express: Framework web para Node.js. | [https://expressjs.com/pt-br/] |
| sequelize: Um ORM poderoso para Node.js. | [https://sequelize.org/] |
| passport: Middleware de autenticação para Node.js. | [https://www.passportjs.org/] |
| jsonwebtoken: Implementação de tokens JWT para Node.js. | [https://www.npmjs.com/package/jsonwebtoken] |
| redis: Biblioteca cliente Redis para Node.js. | [https://www.npmjs.com/package/redis] |


E várias outras bibliotecas para facilitar o desenvolvimento e a funcionalidade do projeto.

Dependências de Desenvolvimento
Algumas das bibliotecas usadas durante o desenvolvimento incluem:

| Lib | README |
| ------ | ------ |
| concurrently: Para executar múltiplas tarefas npm simultaneamente |
| jest: Framework de testes para JavaScript. |
| jsdoc: Gera documentação para JavaScript. |
| nodemon: Monitora mudanças em arquivos e reinicia automaticamente o servidor, caso não queira utilizar docker |


# Docker 

O projeto utiliza Docker para containerização e gerenciamento de serviços. Algumas orientações sobre a configuração do Docker:

O serviço web é a aplicação principal e depende de redis e mysql para funcionar corretamente.
O serviço mysql é um banco de dados relacional e redis é um armazenamento de valor-chave em memória usado para cache e outras funções.
As configurações, incluindo senhas e outros detalhes sensíveis, são gerenciadas através de um arquivo .env que deve ser configurado antes de iniciar os serviços com Docker.
