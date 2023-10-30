const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API da Apontai',
            version: '1.0.0',
            description:"descrição"
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'DEV',
            },
            {
                url: 'https://localhost:3000/api',
                description: 'PRD',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = specs