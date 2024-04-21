import Express from 'express';
import dotenv from 'dotenv';
import router from './routes/router';
import cors from 'cors';
dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static(__dirname + '../public'));
app.set('trust proxy',true); 
app.use(router);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App is running on ${process.env.BASE_URL}:${port}`)
})

export = app;