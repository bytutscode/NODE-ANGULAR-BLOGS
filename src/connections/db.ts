import dotenv from 'dotenv';
dotenv.config();

const db = {
    database: process.env.DB_DATABASE as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    port: process.env.DB_PORT as string
}

if (process.env.NODE_ENV === 'test') {
    db.database = process.env.DB_TEST_DATABASE as string,
        db.user = process.env.DB_TEST_USER as string,
        db.password = process.env.DB_TEST_PASSWORD as string,
        db.port = process.env.DB_TEST_PORT as string
}
console.log(db);

export = db;