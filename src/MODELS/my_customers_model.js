import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db_conexion.js";
import { User } from "./user_model.js";
import { Customer } from "./customer_model.js";
export const MyCustomers = sequelize.define('My_customers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id'
        }
    }
}, {
    timestamps: false,
})