import express from 'express';
import {PORT} from './src/CONFIG/config.js';
import userRouter from './src/ROUTER/user_router.js';
import { sequelize } from './src/DB/db_conexion.js';
import './src/RELATIONS/user_customer_category.js'
import cors from 'cors'
const CURRENT_PORT  = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}));
app.use('/api',userRouter);

const initialize = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connecting...");
        await sequelize.sync({alter: false});
        console.log('Connection has been established successfully.');
        app.listen(CURRENT_PORT, () => {
            console.log(`Server running on port ${CURRENT_PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initialize();