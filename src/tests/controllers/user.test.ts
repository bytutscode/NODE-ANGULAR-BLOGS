import request from 'supertest';
import app from '../../index';
import User from '../../models/User';
import Adm from '../../models/Adm';

describe('testing user controllers', () => {
    const testUserCorrect = {
        name: 'sam',
        email: 'sam@gmail.com',
        password: '12345678'
    }

    const testUserWrong = {
        email: 'sam@gmail.com',
        password: 'invalidPass'
    }

    let user: User;
    let token: string;

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
    })

    it('should create a new user', async () => {
        const res = await request(app).post('/user').send(testUserCorrect);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('name', testUserCorrect.name);
        expect(res.body).toHaveProperty('email', testUserCorrect.email);
    });

    it('should not create a new user', async () => {
        const res = await request(app).post('/user').send(testUserWrong);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message');

        const res2 = await request(app).post('/user').send({ name: 'sam', email: 'invalidemail.com', password: 'password' });
        expect(res2.status).toBe(400);
        expect(res2.body).toHaveProperty('message');
    });

    it('Should login and get a list of users', async () => {

        const resLogin = await request(app).post('/login').send({
            email: testUserCorrect.email,
            password: testUserCorrect.password
        });

        token = resLogin.body.token;

        const res = await request(app).get('/user').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        if (res.body.langth > 0) {
            for (let user of res.body) {
                expect(user).toBeInstanceOf(User);
            }
        }
    });

    it('Should try login with a nonexistent account and give an unauthorized error', async () => {
        const res = await request(app).post('/login').send({
            email: testUserWrong.email,
            password: testUserWrong.password
        });
        expect(res.status).toBe(403);
    })

})
