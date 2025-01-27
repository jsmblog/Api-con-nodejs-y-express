import { DataTypes } from 'sequelize';
import { sequelize } from "../DB/db_conexion.js";

export const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_category : {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, 
});

export default Category;
