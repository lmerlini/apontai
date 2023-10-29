const request = require('supertest');
const BASE_URL = 'http://localhost:3000';
const USER_PASSWORD = {
    username: 'administrator',
    password: 'admin'
};

describe('Auth Routes', () => {
    let token;

    it('should return 200 OK on successful login', async () => {
        const response = await request(BASE_URL)
            .post('/api/auth/login')
            .send(USER_PASSWORD);
        expect(response.status).toBe(200);
    });

    it('should return an access token on successful login', async () => {
        const response = await request(BASE_URL)
            .post('/api/auth/login')
            .send(USER_PASSWORD);
        expect(response.body.token).toBeDefined();

        token = response.body.token; // save the token for future tests
    });

    it('should verify the token', async () => {
        const response = await request(BASE_URL)
            .post('/api/auth/verify-token')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(200);
    });

    it('should logout successfully', async () => {
        const response = await request(BASE_URL)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(200);
    });

    it('should refresh the token', async () => {
        const response = await request(BASE_URL)
            .post('/api/auth/refresh-token')
            .send({ "refresh_token": token });
        expect(response.status).toBe(200);
    });
});
