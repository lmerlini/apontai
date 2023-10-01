const request = require('supertest');
const server = require('../app');

afterAll(done => {
    server.close(done);  // Feche o servidor aqui
});

describe('Login in APP for create clients', async () => {
    it('should return 200 OK on successful login', async () => {
        const response = await request(server)  // Use server em vez de app
            .post('/api/auth/login')
            .send({
                username: 'merlini',
                password: 'admin'
            });
        expect(response.status).toBe(200)
    });

    it('should return 200 for create new client', async () => {

        const response = await request(server).post('/api/clients').send({
            name: "Novo Cliente",
            phone: "16-99999-8888",
            cnpj: "12.345.678/0001-90"
        })
    })

})

