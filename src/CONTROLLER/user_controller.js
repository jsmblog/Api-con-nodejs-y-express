import {User} from '../MODELS/user_model.js';
import bcrypt from 'bcrypt';
export const registerUser = async (req, res) => {
    try {
        const {name, email, identification, password} = req.body;
        const newUser = await User.create({
            name,
            email,
            identification,
            password
        },{
            fields: ['name', 'email', 'identification', 'password']
        });
        
        if(newUser){
            return res.status(201).json({
                message: 'User created successfully',
                data: newUser
            });
        }else {
            return res.status(400).json({
                message: 'User could not be created',
                data: {}
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'identification']
        });
        res.json({
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where: {id: id},
            attributes: ['id', 'name', 'email', 'identification']
        });
        if(user){
            res.json({
                data: user
            });
        }else {
            res.status(404).json({
                message: 'User not found',
                data: {}
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteRowCount = await User.destroy({
            where: {id: id}
        });
        res.json({
            message: 'User deleted successfully',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, identification, password} = req.body;
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'identification', 'password'],
            where: {id: id}
        });
        if(users.length > 0){
            const user = users[0];
            let hashedPassword = user.password;
            if (password && password !== user.password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }
            await user.update({
                name,
                email,
                identification,
                password: hashedPassword
            });
            const userWithoutPassword = {...user.toJSON()};
            delete userWithoutPassword.password;
            return res.json({
                message: 'User updated successfully',
                data: userWithoutPassword
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
                data: {}
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updatePartialUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, identification, password} = req.body;
        const user = await User.findOne({
            where: {id: id}
        });
        if(user){
            const updates = {};
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (identification) updates.identification = identification;
            if (password) {
                updates.password = await bcrypt.hash(password, 10);
            }
            await user.update(updates);
            const userWithoutPassword = {...user.toJSON()};
            delete userWithoutPassword.password;
            return res.json({
                message: 'User updated successfully',
                data: userWithoutPassword
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
                data: {}
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {email: email}
        });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const userWithoutPassword = {...user.toJSON()};
                delete userWithoutPassword.password;
                delete userWithoutPassword.identification;
                return res.json({
                    message: 'User logged in successfully',
                    data: userWithoutPassword
                });
            }else {
                return res.status(400).json({
                    message: 'Incorrect password',
                    data: {}
                });
            }
        }else {
            return res.status(404).json({
                message: 'User not found',
                data: {}
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}