import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db_conexion.js";
import bcrypt from 'bcrypt';
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Invalid email format"
            },
            notEmpty: {
                msg: "Email is required"
            }
        }
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 8
    }
},{
    timestamps: false,
    hooks:{
        beforeCreate : (user) => {
            user.password = bcrypt.hashSync(user.password, 10);
        }
    }
});