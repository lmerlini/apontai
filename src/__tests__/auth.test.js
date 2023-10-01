const request = require('supertest');
const server = require('../app');

afterAll(done => {
    server.close(done);  // Feche o servidor aqui
});

describe('Auth Routes', () => {
    it('should return 200 OK on successful login', async () => {
        const response = await request(server)  // Use server em vez de app
            .post('/api/auth/login')
            .send({
                username: 'merlini',
                password: 'admin'
            });

        expect(response.status).toBe(200)
    });

    it('should return 401 Unauthorized on failed login', async () => {
        const response = await request(server)  // Use server em vez de app
            .post('/api/auth/login')
            .send({
                username: 'merlini',
                password: 'admin1'
            });

        expect(response.status).toBe(401);
    });

    it('should return 401 status for non-existing login route', async () => {
        const response = await request(server)
            .get('/api/auth/logar')

        expect(response.status).toBe(404)
    })
});


