import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db_conexion.js";
import Category from "./customer_category_model.js";

export const Customer = sequelize.define("Customer", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    }
},{
    timestamps: false
})