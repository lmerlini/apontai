const request = require('supertest');
const BASE_URL = 'http://localhost:3000/api';

describe('Company Routes', () => {
    let token; 

    beforeAll(async () => {
        // Você precisaria obter um token de autenticação aqui se sua API exigir
        // Simulando um login para obter o token
        const response = await request(BASE_URL)
            .post('/auth/login')
            .send({ username: 'administrator', password: 'admin' });
        token = response.body.token;
    });

    it('GET /list should return a list of companies', async () => {
        const response = await request(BASE_URL)
            .get('/companies/list')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('POST /create should create a company', async () => {
        const newCompanyData = {
            name: 'New Company',
            nick_name: 'test company',
            cnpj: '12345678000189',
            enrollment: 3213,
            phone: 123
        };
        const response = await request(BASE_URL)
            .post('/companies/create')
            .set('Authorization', `Bearer ${token}`)
            .send(newCompanyData);
        expect(response.status).toBe(201);
        expect(response.body.name).toEqual(newCompanyData.name);
    });

    it('PATCH /update/:id should update a company', async () => {
        const companyIdToUpdate = 2;
        const updatedCompanyData = {
            name: 'Updated Company 1'
        };
        const response = await request(BASE_URL)
            .patch(`/companies/update/${companyIdToUpdate}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedCompanyData);
        expect(response.status).toBe(200);        
        expect(response.body.name).toEqual(updatedCompanyData.name);
    });

    it('DELETE /delete/ by id should delete a company', async () => {
        const companyIdToDelete = 2;

        const response = await request(BASE_URL)
            .delete('/companies/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ companyId: companyIdToDelete });
        expect(response.status).toBe(204);
    });
   
});
