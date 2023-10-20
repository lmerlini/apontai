const request = require('supertest');
const server = require('../app');
const USER_PASSWORD = {
    username: 'administrator',
    password: 'admin'
}

afterAll(done => {
    server.close(done);
});

describe('Auth Routes', () => {
    it('should return 200 OK on successful login', async () => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'administrator',
                password: 'admin'
            });

        expect(response.status).toBe(200)
    });

});


