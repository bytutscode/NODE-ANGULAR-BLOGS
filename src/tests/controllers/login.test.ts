import request from 'supertest';
import app from '../../index';
import Adm from "../../models/Adm";
import User from "../../models/User"

describe('login testing', () => {

    const testUserCorrect = {
        name: 'sam',
        email: 'sam@gmail.com',
        password: '12345678'
    }

    const testUserWrong = {
        email: 'sam@gmail.com',
        password: 'invalid'
    }

    beforeAll(async () => {
        await User.sync({ force: true });
        await Adm.sync({ force: true });

        await request(app).post('/user').send(testUserCorrect);
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
        await Adm.destroy({ where: {} });
    })

    it('should login with email and password correctly', async () => {
        const res = await request(app).post('/login').send({
            email: testUserCorrect.email,
            password: testUserCorrect.password
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('userEmail', testUserCorrect.email);
        expect(res.body.user).toHaveProperty('name', testUserCorrect.name);
        expect(res.body).toHaveProperty('token');
    });

})