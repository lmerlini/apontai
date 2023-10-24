etapas de estudos

1. npm init -y
2. npm install express sequelize sequelize-cli mysql2 body-parser
3. npx sequelize-cli init
 -- isso irá criar algumas pastas: config, models, migrations e seeders.
4. No arquivo config/config.json, ajuste a configuração para se conectar ao seu banco de dados MySQL (ou outro de sua escolha, lembrando que se for outro, deverá ajustar a dependência instalada):

4.1 Criação dos modelos e migrações 
  -- npx sequelize-cli model:generate --name Client --attributes name:string,phone:string,cnpj:string

5. Rodar as migrações..: 
 -- npx sequelize-cli db:migrate ou  npm run db:refresh 

6. rodar seeders 
  -- npx sequelize-cli db:seed:all



TODOS:
 - Refatorar a Passport Para que as Controllers Conhecam Apenas Interfaces
 - Criar a services (abstrair) [no]
 - Criar repository [ok]
 - implementar JWT [ok]
 -- ENTENDER MELHOR OS  TESTE UNITÁRIAS E TESTES DE INTEGRAÇÃO;
 -- ENTENDER OS TESTES COM MOCKS DE TESTES;

