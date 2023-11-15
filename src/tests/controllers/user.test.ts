import request from 'supertest';
import app from '../../index';
import User from '../../models/User';

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

    it('Should get an user by id', async () => {
        const res = await request(app).get('/user/1').set('Authorization', 'Bearer ' + token);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('name', testUserCorrect.name);
        expect(res.body).toHaveProperty('email', testUserCorrect.email);
    });

    it('Should update just a logged user name', async () => {
        const res = await request(app).put('/user').
            set('Authorization', 'Bearer ' + token).
            send({ name: 'newName' });

        expect(res.status).toBe(204);

        const res2 = await request(app).get('/user/1').set('Authorization', 'Bearer ' + token);
        expect(res2.body).toHaveProperty('name', 'newName');
    });

    it('Should update logged user name,email and password', async () => {
        const res = await request(app).put('/user').
            set('Authorization', 'Bearer ' + token).
            send({ name: 'sam', email: 'sam2@gmail.com', password: '12345678' });

        expect(res.status).toBe(204);

        const res2 = await request(app).get('/user/1').set('Authorization', 'Bearer ' + token);
        expect(res2.body).toHaveProperty('name', 'sam');
        expect(res2.body).toHaveProperty('email', 'sam2@gmail.com');
    });

    it('Should delete logged user account', async () => {
        const res = await request(app).delete('/user').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(204);

        const res2 = await request(app).get('/user/1').set('Authorization', 'Bearer ' + token);
        expect(res2.status).toBe(404);
    });

})
