import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import db from './db';
dotenv.config()

// const sequelize = new Sequelize(
//     db.database,
//     db.user,
//     db.password,
//     {
//         port: parseInt(db.port),
//         dialect: 'postgres',
//         logging: false
//     }
// )

// by URL
const sequelize = new Sequelize(
    process.env.DB_URL as string,
    { dialectModule: require('pg'), dialect: 'postgres' }
)

export default sequelize;