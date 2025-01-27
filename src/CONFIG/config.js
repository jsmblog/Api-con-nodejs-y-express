import * as dotenv from 'dotenv';
dotenv.config();

export const DB_CONNECTION = process.env.DB_CONNECTION;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET
console.log('DB_CONNECTION:', DB_CONNECTION);
console.log('DB_HOST:', DB_HOST);
console.log('DB_DATABASE:', DB_DATABASE);