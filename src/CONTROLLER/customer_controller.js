import { Customer } from "../MODELS/customer_model.js";
import { Category } from "../MODELS/customer_category_model.js";
import { MyCustomers } from "../MODELS/my_customers_model.js";

export const store_customer = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Please enter name" });
        }

        if (!categoryId) {
            return res.status(400).json({ message: "Please provide a categoryId" });
        }

        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        const userId = req.user?.id; 
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. User ID not found." });
        }

        const customer = await Customer.create({ name, categoryId });
        const myCustomer = await MyCustomers.create({
            user_id: userId,
            customer_id: customer.id,
        });

        return res.status(201).json({
            message: "Customer and relationship created successfully",
            data: { customer, myCustomer },
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            include: [{
                model: Category,
                attributes: ['name_category'] 
            }]
        });

        if (!customers.length) {
            return res.status(404).json({ message: "No customers found" });
        }

        return res.status(200).json({ customers });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, categoryId } = req.body;

        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (name) {
            customer.name = name;
        }

        if (categoryId) {
            const categoryExists = await Category.findByPk(categoryId);
            if (!categoryExists) {
                return res.status(404).json({ message: "Category not found" });
            }
            customer.categoryId = categoryId;
        }

        await customer.save();

        return res.status(200).json({ message: "Customer updated successfully", customer });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params; 

        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await customer.destroy();

        return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const filterCustomersByCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide a categoryId" });
        }

        const categoryExists = await Category.findByPk(id);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        const customers = await Customer.findAll({
            where: { categoryId: id },
            include: [{
                model: Category,
                as: 'category', 
                attributes: ['name_category']
            }]
        });

        if (!customers.length) {
            return res.status(404).json({ message: "No customers found for this category" });
        }

        return res.status(200).json({ customers });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};



