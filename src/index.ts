import Express from 'express';
import dotenv from 'dotenv';
import router from './routes/router';
dotenv.config();

const app = Express();

app.use(Express.json());
app.use(Express.static(__dirname + '../public'));
app.use(router);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App is running on ${process.env.BASE_URL}:${port}`)
})