// Importar los modelos necesarios
import { User } from '../MODELS/user_model.js';
import { Customer } from '../MODELS/customer_model.js';
import Category from '../MODELS/customer_category_model.js';
import { MyCustomers } from '../MODELS/my_customers_model.js';

// Relación entre Customer y Category (uno a muchos)
Category.hasMany(Customer, {
    foreignKey: 'categoryId', 
    as: 'customers',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE', 
});

Customer.belongsTo(Category, {
    foreignKey: 'categoryId', 
    as: 'category', 
});

// Relación entre User y MyCustomers (uno a muchos)
User.hasMany(MyCustomers, {
    foreignKey: 'user_id', 
    as: 'myCustomers',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

MyCustomers.belongsTo(User, {
    foreignKey: 'user_id', 
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Relación entre Customer y MyCustomers (uno a muchos)
Customer.hasMany(MyCustomers, {
    foreignKey: 'customer_id', 
    as: 'myCustomers',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE', 
});

MyCustomers.belongsTo(Customer, {
    foreignKey: 'customer_id', 
    as: 'customer',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE', 
});

export default {
    User,
    Customer,
    Category,
    MyCustomers,
};
