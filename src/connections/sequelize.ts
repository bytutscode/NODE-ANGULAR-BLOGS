import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        port: parseInt(process.env.DB_PORT as string),
        dialect: 'postgres',
        logging: false
    }
)

export default sequelize;