import express from 'express';
import { registerUser, getUser, deleteUser, updateUser, updatePartialUser, loginUser, getUserById } from '../CONTROLLER/user_controller.js';
import { store_category } from '../CONTROLLER/customer_category_controller.js';
import { store_customer, getAllCustomers, updateCustomer, deleteCustomer, filterCustomersByCategory } from '../CONTROLLER/customer_controller.js';
import { authenticateToken } from '../AUTH_MIDDLEWARE/authenticateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get_users', getUser);
router.get('/get_users/:id', getUserById);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);
router.patch('/update/:id', updatePartialUser);
router.post('/create_category', authenticateToken, store_category);
router.post('/registro/cliente', authenticateToken, store_customer);
router.get('/clientes', authenticateToken, getAllCustomers);
router.patch('/clientes/:id', authenticateToken, updateCustomer);
router.delete('/clientes/:id', authenticateToken, deleteCustomer);
router.get('/clientes/filter/:id', authenticateToken, filterCustomersByCategory);

export default router;
